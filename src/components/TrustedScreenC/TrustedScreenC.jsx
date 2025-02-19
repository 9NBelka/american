import TrustedScreen from '../TrustedScreen/TrustedScreen';
import scss from './TrustedScreenC.module.scss';

export default function TrustedScreenC({ imageTrusted, architecturePageC }) {
  const right = true;
  return (
    <div className={scss.trustedScreenMarg}>
      <TrustedScreen imageTrusted={imageTrusted} architecturePageC={architecturePageC} />
      <TrustedScreen
        right={right}
        imageTrusted={imageTrusted}
        architecturePageC={architecturePageC}
      />
    </div>
  );
}
