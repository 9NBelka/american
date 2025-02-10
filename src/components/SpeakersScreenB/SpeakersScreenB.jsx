import clsx from 'clsx';
import scss from './SpeakersScreenB.module.scss';
import SpeakersScreenGeneralB from './SpeakersScreenGeneralB/SpeakersScreenGeneralB';

export default function SpeakersScreenB({ speakersInfo }) {
  return (
    <>
      <SpeakersScreenGeneralB speakersInfo={speakersInfo} />
      <div className={scss.speakersScreenBlockMain}>
        {speakersInfo.speakerScreen.map((info, index) => (
          <div key={index} className={scss.speakersScreenBlock}>
            <img src={info.imageSpeaker} alt={info.nameSpeaker} className={scss.imageSpeaker} />
            <h3 className={scss.nameSpeaker}>{info.nameSpeaker}</h3>
            <h3 className={scss.subText}>{info.characteristicSpeaker}</h3>
            <h3 className={clsx(scss.subText, scss.lineAndUpper)}>
              lectures by {info.nameSpeaker}
            </h3>
            <a className={scss.linkedInSpeaker} href={info.linkedInSpeaker} target='_blank'>
              LinkedIn
            </a>
            <a
              className={clsx(scss.linkedInSpeaker, scss.youTubeSpeaker)}
              href={info.linkedInSpeaker}
              target='_blank'>
              Watch performances on YouTube
            </a>
            <div className={scss.descriptionSpeakerBlock}>
              {info.descriptionSpeaker.map((description, index) => (
                <p key={index} className={scss.descriptionSpeaker}>
                  {description}
                </p>
              ))}
            </div>
            <h3 className={clsx(scss.subText, scss.lineAndUpper, scss.lineInstructor)}>
              instructor modules
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
