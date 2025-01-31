import scss from './StickyProduct.module.scss';

export default function StickyProduct({ infoAboutProduct }) {
  return (
    <>
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
      </div>
    </>
  );
}
