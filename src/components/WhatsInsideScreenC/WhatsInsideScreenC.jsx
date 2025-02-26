import scss from './WhatsInsideScreenC.module.scss';
import WhatsInsideScreenSliderC from './WhatsInsideScreenSliderC/WhatsInsideScreenSliderC';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';

export default function WhatsInsideScreenC({ programCourseInfo, architecturePageC }) {
  const modulesCount = 5; // определяет количество модулей (всего 5 модулей).
  const columnsPerModule = 3; // задает, что в каждом модуле будет 3 столбца.
  const lessonsPerModule = Math.ceil(programCourseInfo.insideScreen.length / modulesCount);
  // Math.ceil(...) округляет вверх, чтобы все уроки были распределены между модулями.

  const modules = Array.from({ length: modulesCount }, (_, moduleIndex) => {
    // Создаем массив из 5 элементов (по количеству модулей).
    // Используем .map через Array.from(), чтобы заполнить массив нужными данными.
    const startIdx = moduleIndex * lessonsPerModule;
    // Вычисляем начальный индекс для текущего модуля.
    // Например, если в модуле 6 уроков, то для 1-го модуля startIdx = 0, для 2-го startIdx = 6 и так далее.
    const moduleLessons = programCourseInfo.insideScreen.slice(
      startIdx,
      startIdx + lessonsPerModule,
    );

    // slice(startIdx, startIdx + lessonsPerModule) — вырезает lessonsPerModule уроков для текущего модуля.

    const columns = Array.from({ length: columnsPerModule }, (_, colIndex) =>
      moduleLessons.filter((_, lessonIdx) => lessonIdx % columnsPerModule === colIndex),
    );
    return columns;
  });

  // Использую .flat() для извлечения всех уроков модуля, затем .find() для получения названия первого модуля:
  return (
    <>
      <div className={scss.insideScreenBlockMain}>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className={scss.moduleBlock}>
            <h3>
              Module {moduleIndex + 1}:{' '}
              <span className={scss.colorWhite}>
                {module.flat().find((lesson) => lesson)?.insideScreenModuleTitle}
              </span>
            </h3>
            <div className={scss.moduleColumns}>
              {module.map((column, colIndex) => (
                <div key={colIndex} className={scss.insideScreenBlock}>
                  {column.map((info, lessonIndex) => (
                    <div key={lessonIndex} className={scss.insideScreenTitleAndContent}>
                      <img src={info.insideScreenImage} alt={`image ${info.insideScreenTitle}`} />
                      <h3>{info.insideScreenTitle}</h3>
                      <h5>{info.insideScreenContent}</h5>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={scss.insideScreenBlockMainPhone}>
        <WhatsInsideScreenSliderC programCourseInfo={programCourseInfo} />
        <IntermediaryBuyNow architecturePageC={architecturePageC} />
      </div>
    </>
  );
}
