import css from './StickyProduct.module.css';

export default function StickyProduct({ infoAboutProduct }) {
  return (
    <>
      <div className={css.stickyBlock}>
        <iframe
          src={infoAboutProduct.stickyBlockVideo}
          className={css.stickyBlockVideo}
          allow='autoplay; encrypted-media'
          allowFullScreen></iframe>

        <h5 className={css.stickyBlockPrice}>{infoAboutProduct.stickyBlockPrice}</h5>
        <a src={infoAboutProduct.stickyBlockLinkBuy} className={css.stickyBlockBuyNow}>
          <h5>BUY NOW</h5>
        </a>
      </div>
    </>
  );
}
