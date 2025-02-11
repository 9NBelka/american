import scss from './TrustedScreenB.module.scss';

export default function TrustedScreenB({ imageTrusted }) {
  const halfImages = imageTrusted.trustedScreenImages.slice(
    0,
    Math.ceil(imageTrusted.trustedScreenImages.length / 2),
  );
  return (
    <div className={scss.logoBlocks}>
      {halfImages.map((img, index) => (
        <div key={index} className={scss.logoCompanyBlock}>
          <img src={img} className={scss.logoCompanyGrey} />
        </div>
      ))}
    </div>
  );
}
