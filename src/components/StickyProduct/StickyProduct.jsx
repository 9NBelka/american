import css from './StickyProduct.module.css';

export default function StickyProduct({ infoAboutProduct }) {
  return (
    <>
      {infoAboutProduct.map((info, index) => (
        <div key={index} className={css.stickyBlock}>
          <iframe
            src={info.stickyBlockVideo}
            className={css.stickyBlockVideo}
            allow='autoplay; encrypted-media'
            allowFullScreen></iframe>

          <h5 className={css.stickyBlockPrice}>{info.stickyBlockPrice}</h5>
          <a src={info.stickyBlockLinkBuy} className={css.stickyBlockBuyNow}>
            <h5>BUY NOW</h5>
          </a>
        </div>
      ))}
    </>
  );
}
