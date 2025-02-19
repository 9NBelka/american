import { BsFillPlayBtnFill } from 'react-icons/bs';
import scss from './DemoVideosScreenC.module.scss';

export default function DemoVideosScreenC({ demoVideos }) {
  // Функция для получения ID видео из ссылки
  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    );
    return match ? match[1] : null;
  };

  return (
    <div className={scss.demoVideosContainer}>
      {demoVideos.demoVideos.demoVideosTitle.map((title, index) => {
        const videoUrl = demoVideos.demoVideos.demoVideosLinkOnYoutube[index];
        const videoId = getYouTubeId(videoUrl);
        const thumbnailUrl = videoId
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : 'https://via.placeholder.com/480x270?text=Invalid+Video';

        return (
          <div key={index} className={scss.videoBlock}>
            <img src={thumbnailUrl} alt={title} className={scss.videoThumbnail} />
            <div className={scss.videoInfo}>
              <div className={scss.videoInfoIconAndTitle}>
                <BsFillPlayBtnFill className={scss.icon} />
                <h3>{title}</h3>
              </div>
              <p>{demoVideos.demoVideos.demoVideosDescription[index]}</p>
            </div>
            <a
              href={videoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={scss.watchButton}>
              Watch
            </a>
          </div>
        );
      })}
    </div>
  );
}
