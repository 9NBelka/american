import scss from './SpeakersScreen.module.scss';

export default function SpeakersScreen({ speakersInfo }) {
  const generalInfo = speakersInfo.speakerScreenGeneralInformation[0];

  return (
    <div className={scss.speakerBlocksMain}>
      {speakersInfo.speakerScreen.map((info, index) => (
        <div key={index} className={scss.speakerBlocks}>
          <div className={scss.speakerBlock}>
            <div className={scss.speakerImageblock}>
              <img className={scss.imageSpeaker} src={info.imageSpeaker} />
            </div>
            <div className={scss.speakerInfoBlock}>
              <h3 className={scss.nameSpeaker}>{info.nameSpeaker}</h3>
              <div className={scss.descriptionSpeakerBlock}>
                {info.descriptionSpeaker.map((text, idx) => (
                  <h5 key={idx} className={scss.descriptionSpeaker}>
                    {text}
                  </h5>
                ))}
              </div>
              <a href={info.linkedInSpeaker} className={scss.linkedInSpeaker} target='_blank'>
                <img src='https://lms.k-syndicate.school/wp-content/uploads/2024/02/linkedIn-esc.png' />
              </a>
            </div>
          </div>

          {/* Общая информация после первой карточки */}

          {index === 0 && generalInfo && (
            <div className={scss.generalInfoBlock}>
              <p className={scss.generalInfoText}>{generalInfo.generalInfo}</p>
              <h4 className={scss.generalInfoTitle}>{generalInfo.generalInfoListTitle}</h4>
              <ul className={scss.generalInfoList}>
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
