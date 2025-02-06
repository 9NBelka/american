import Marquee from 'react-fast-marquee';
import scss from './TrustedScreen.module.scss';

export default function TrustedScreen({ imageTrusted }) {
  return (
    <Marquee speed={50} gradient={false} className={scss.trustedScreenBlocks}>
      {imageTrusted.trustedScreenImages.map((img, index) => (
        <div key={index} className={scss.trustedScreenBlock}>
          <img src={img} alt='Scrolling' className={scss.trustedScreenImages} />
        </div>
      ))}
    </Marquee>
  );
}
