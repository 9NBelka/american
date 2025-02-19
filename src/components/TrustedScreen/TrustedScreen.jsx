import Marquee from 'react-fast-marquee';
import scss from './TrustedScreen.module.scss';
import clsx from 'clsx';

export default function TrustedScreen({ imageTrusted, right, architecturePageC }) {
  return (
    <Marquee
      direction={right}
      speed={50}
      gradient={false}
      className={clsx(scss.trustedScreenBlocks, architecturePageC && scss.trustedScreenBlocksC)}>
      {imageTrusted.trustedScreenImages.map((img, index) => (
        <div key={index} className={scss.trustedScreenBlock}>
          <img src={img} alt='Scrolling' className={scss.trustedScreenImages} />
        </div>
      ))}
    </Marquee>
  );
}
