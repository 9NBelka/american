import scss from './SampleCertificate.module.scss';

export default function SampleCertificate({ imageCerctificate }) {
  return (
    <div className={scss.sampleCertificateBlock}>
      <img
        className={scss.sampleCertificate}
        src={imageCerctificate.sampleCertificate}
        alt='sampleCertificate'
      />
    </div>
  );
}
