import css from './SpeakersScreen.module.css';

export default function SpeakersScreen({ speakersInfo }) {
  return (
    <div>
      {speakersInfo.speakerScreen.map((info, index) => (
        <div key={index} className={css.speakerBlock}>
          <div className={css.speakerImageblock}>
            <img className={css.imageSpeaker} src={info.imageSpeaker} />
          </div>
          <div className={css.speakerInfoBlock}>
            <h3 className={css.nameSpeaker}>{info.nameSpeaker}</h3>
            <div className={css.descriptionSpeakerBlock}>
              {info.descriptionSpeaker.map((text, index) => (
                <h5 key={index} className={css.descriptionSpeaker}>
                  {text}
                </h5>
              ))}
            </div>
            <a href={info.linkedInSpeaker} className={css.linkedInSpeaker} target='_blank'>
              <img src='https://lms.k-syndicate.school/wp-content/uploads/2024/02/linkedIn-esc.png' />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
