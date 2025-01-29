import css from './SpeakersScreen.module.css';

export default function SpeakersScreen({ speakersInfo }) {
  const generalInfo = speakersInfo.speakerScreenGeneralInformation[0];

  return (
    <div>
      {speakersInfo.speakerScreen.map((info, index) => (
        <div key={index} className={css.speakerBlocks}>
          <div className={css.speakerBlock}>
            <div className={css.speakerImageblock}>
              <img className={css.imageSpeaker} src={info.imageSpeaker} />
            </div>
            <div className={css.speakerInfoBlock}>
              <h3 className={css.nameSpeaker}>{info.nameSpeaker}</h3>
              <div className={css.descriptionSpeakerBlock}>
                {info.descriptionSpeaker.map((text, idx) => (
                  <h5 key={idx} className={css.descriptionSpeaker}>
                    {text}
                  </h5>
                ))}
              </div>
              <a href={info.linkedInSpeaker} className={css.linkedInSpeaker} target='_blank'>
                <img src='https://lms.k-syndicate.school/wp-content/uploads/2024/02/linkedIn-esc.png' />
              </a>
            </div>
          </div>

          {/* Общая информация после первой карточки */}

          {index === 0 && generalInfo && (
            <div className={css.generalInfoBlock}>
              <p className={css.generalInfoText}>{generalInfo.generalInfo}</p>
              <h4 className={css.generalInfoTitle}>{generalInfo.generalInfoListTitle}</h4>
              <ul className={css.generalInfoList}>
                {generalInfo.generalInfoList.map((item, linkIdx) => (
                  <li key={linkIdx}>
                    {item.beforeLinkText}
                    <a href={generalInfo.generalInfoListLinks[linkIdx]} target='_blank'>
                      {item.linkText}
                    </a>
                    {item.afterLinkText}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
