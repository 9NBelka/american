import SpeakerCardC from './SpeakerCardC/SpeakerCardC';
import scss from './SpeakersScreenC.module.scss';

export default function SpeakersScreenC({ speakersInfo }) {
  return (
    <div className={scss.speakersContainer}>
      <div className={scss.speaker}>
        <SpeakerCardC speaker={speakersInfo.speakersC[0]} />
      </div>

      <div className={scss.generalInfo}>
        <div className={scss.logoCourse}>
          <img src={speakersInfo.logoCourse} alt='logoCourse' />
        </div>
        <p className={scss.generalInfoText}>{speakersInfo.generalInfoC.title}</p>
        <p className={scss.generalInfoTitleList}>{speakersInfo.generalInfoC.subtitle}</p>
        <ul>
          {speakersInfo.generalInfoC.topics.map((topic, index) => (
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

      <div className={scss.speaker}>
        <SpeakerCardC speaker={speakersInfo.speakersC[1]} />
      </div>
    </div>
  );
}
