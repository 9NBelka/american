import GeneralInfo from './GeneralInfo/GeneralInfo';
import SpeakerCardC from './SpeakerCardC/SpeakerCardC';
import scss from './SpeakersScreenC.module.scss';

export default function SpeakersScreenC({ speakersInfo }) {
  return (
    <>
      <div className={scss.speakersContainer}>
        <div className={scss.speaker}>
          <SpeakerCardC speaker={speakersInfo.speakersC[0]} />
        </div>

        <div className={scss.general}>
          <GeneralInfo generalSpeakersInfo={speakersInfo} />
        </div>

        <div className={scss.speaker}>
          <SpeakerCardC speaker={speakersInfo.speakersC[1]} />
        </div>
      </div>
      <div className={scss.generalPhone}>
        <GeneralInfo generalSpeakersInfo={speakersInfo} />
      </div>
    </>
  );
}
