import scss from './GeneralInfo.module.scss';

export default function GeneralInfo({ generalSpeakersInfo }) {
  return (
    <div className={scss.generalInfo}>
      <div className={scss.logoCourse}>
        <img src={generalSpeakersInfo.logoCourse} alt='logoCourse' />
      </div>
      <p className={scss.generalInfoText}>{generalSpeakersInfo.generalInfoC.title}</p>
      <p className={scss.generalInfoTitleList}>{generalSpeakersInfo.generalInfoC.subtitle}</p>
      <ul>
        {generalSpeakersInfo.generalInfoC.topics.map((topic, index) => (
          <li key={index}>
            {index === 0 ? (
              <>
                {topic.text}{' '}
                <a href={topic.link} target='_blank' rel='noopener noreferrer'>
                  {topic.highlight}
                </a>
              </>
            ) : (
              <>
                <a href={topic.link} target='_blank' rel='noopener noreferrer'>
                  {topic.text}
                </a>{' '}
                {topic.highlight}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
