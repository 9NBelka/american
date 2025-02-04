import scss from './StickyProduct.module.scss';

export default function StickyProduct({ infoAboutProduct }) {
  return (
    <div className={scss.stickyBlockFlex}>
      <div className={scss.stickyBlock}>
        <iframe
          src={infoAboutProduct.stickyBlockVideo}
          className={scss.stickyBlockVideo}
          allow='autoplay; encrypted-media'
          allowFullScreen></iframe>

        <h5 className={scss.stickyBlockPrice}>{infoAboutProduct.stickyBlockPrice}</h5>
        <a src={infoAboutProduct.stickyBlockLinkBuy} className={scss.stickyBlockBuyNow}>
          <h5>BUY NOW</h5>
        </a>
        <div className={scss.stickyBlockInfoAboutCourse}>
          {infoAboutProduct.stickyBlockInfoAboutCourseTitle.map((title, index) => (
            <div key={index} className={scss.stickyBlockInfoAboutCourseBlock}>
              <h6 key={index}>{title}</h6>
              <h6 key={index}>{infoAboutProduct.stickyBlockInfoAboutCourse[index]}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
