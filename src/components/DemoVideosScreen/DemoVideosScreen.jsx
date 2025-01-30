import { useState } from 'react';
import scss from './DemoVideosScreen.module.scss';
import { BsCameraVideo } from 'react-icons/bs';
import clsx from 'clsx';

export default function DemoVideosScreen({ demoVideos }) {
  const [activeIndex, setActiveIndex] = useState(null); // Индекс активной ссылки

  const boldText = (index) => {
    setActiveIndex(index); // Запоминаем, какую ссылку нажали
  };

  return (
    <div className={scss.demoVideosBlocks}>
      {demoVideos.demoVideos.demoVideosTitle.map((title, index) => (
        <a
          key={index}
          href={demoVideos.demoVideos.demoVideosLink[index]}
          className={scss.demoVideosLink}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => boldText(index)}>
          <div className={scss.demoVideosBlockText}>
            <div className={scss.demoVideosBlockIndexIconTitle}>
              <h5>{index + 1}</h5>
              <BsCameraVideo
                className={clsx(
                  scss.demoVideosIcon,
                  activeIndex === index && scss.demoVideosIconBackground,
                )}
              />
              <h5>{title}</h5>
            </div>
            <h5>{demoVideos.demoVideos.demoVideosLinkTimeLine[index]}</h5>
          </div>
        </a>
      ))}
    </div>
  );
}
