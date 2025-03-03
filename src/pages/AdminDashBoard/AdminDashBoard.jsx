import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function AdminDashBoard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для ошибок формы

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.name || '');
          setUserRole(data.role || '');
          setRegistrationDate(data.registrationDate || '');

          // Проверка роли: только Админ может видеть админку
          if (data.role !== 'admin') {
            navigate('/dashboard');
          }
        } else {
          console.log('Документ пользователя не найден в Firestore');
          navigate('/login');
        }
        setIsLoading(false);
      } else {
        navigate('/login');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  // Начальные значения формы
  const initialValues = {
    name: '',
    email: '',
    courseName: '',
    coursePackage: '',
    role: '',
  };

  // Обработчик отправки формы
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Проверяем, существует ли пользователь с таким email
      const usersQuery = query(collection(db, 'users'), where('email', '==', values.email));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        setErrorMessage('Пользователь с таким email уже существует');
        setSubmitting(false);
        return; // Прекращаем выполнение, если email уже есть
      }

      // Устанавливаем текущую дату как registrationDate
      const registrationDate = new Date();

      // Данные для отправки в Firestore
      const userData = {
        name: values.name,
        email: values.email,
        registrationDate: registrationDate,
        courseName: values.courseName,
        coursePackage: values.coursePackage,
        role: values.role,
      };

      // Отправка в коллекцию 'users'
      await addDoc(collection(db, 'users'), userData);

      console.log('Пользователь успешно добавлен:', userData);
      setErrorMessage(''); // Очищаем сообщение об ошибке
      resetForm(); // Очищаем форму после успешной отправки
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      setErrorMessage('Ошибка при регистрации: ' + error.message);
    } finally {
      setSubmitting(false); // Завершаем состояние отправки
    }
  };

  // Валидация формы
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Имя обязательно';
    if (!values.email) {
      errors.email = 'Почта обязательна';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Неверный формат почты';
    }
    if (!values.courseName) errors.courseName = 'Курс обязателен';
    if (!values.coursePackage) errors.coursePackage = 'Пакет курса обязателен';
    if (!values.role) errors.role = 'Роль обязательна';
    return errors;
  };

  if (isLoading) {
    return <div>Загрузка...</div>; // Пока статус не определён, показываем загрузку
  }

  return (
    <div>
      <h2>Профиль</h2>
      <p>Добро пожаловать, {userName}!</p>
      <p>Роль: {userRole}</p>
      <p>Дата регистрации: {new Date(registrationDate).toLocaleString()}</p>
      <button onClick={handleLogout}>Выйти</button>

      <div>
        <h2>Регистрация пользователя</h2>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor='name'>Имя:</label>
                <br />
                <Field type='text' name='name' id='name' />
                <ErrorMessage name='name' component='div' style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor='email'>Почта:</label>
                <br />
                <Field type='email' name='email' id='email' />
                <ErrorMessage name='email' component='div' style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor='courseName'>Курс:</label>
                <br />
                <Field as='select' name='courseName' id='courseName'>
                  <option value=''>Выберите курс</option>
                  <option value='Architecture'>Architecture</option>
                  <option value='TeamLead'>TeamLead</option>
                  <option value='UnitTesting'>UnitTesting</option>
                  <option value='UtilityAI'>UtilityAI</option>
                  <option value='Adressabless'>Adressabless</option>
                  <option value='ECS'>ECS</option>
                </Field>
                <ErrorMessage name='courseName' component='div' style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor='coursePackage'>Пакет курса:</label>
                <br />
                <Field as='select' name='coursePackage' id='coursePackage'>
                  <option value=''>Выберите пакет</option>
                  <option value='Ванила'>Ванила</option>
                  <option value='Стандарт'>Стандарт</option>
                </Field>
                <ErrorMessage name='coursePackage' component='div' style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor='role'>Роль:</label>
                <br />
                <Field as='select' name='role' id='role'>
                  <option value=''>Выберите роль</option>
                  <option value='Гость'>Гость</option>
                  <option value='Студент'>Студент</option>
                  <option value='Админ'>Админ</option>
                </Field>
                <ErrorMessage name='role' component='div' style={{ color: 'red' }} />
              </div>

              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Зарегистрировать'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
