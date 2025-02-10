import scss from './SpeakersScreenGeneralB.module.scss';

export default function SpeakersScreenGeneralB({ speakersInfo }) {
  return (
    <div className={scss.speakersScreenGeneralMain}>
      {speakersInfo.speakerScreenGeneralInformation.map((text, index) => (
        <div key={index} className={scss.generalInfoBlock}>
          <p className={scss.generalInfoText}>{text.generalInfo}</p>
          <h4 className={scss.generalInfoTitle}>{text.generalInfoListTitle}</h4>
          <ul className={scss.generalInfoList}>
            {text.generalInfoList.map((item, linkIdx) => (
              <li key={linkIdx}>
                {item.beforeLinkText}
                <a href={text.generalInfoListLinks[linkIdx]} target='_blank'>
                  {item.linkText}
                </a>
                {item.afterLinkText}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
