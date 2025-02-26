import { BsLinkedin, BsReddit, BsTwitterX, BsWhatsapp, BsYoutube } from 'react-icons/bs';
import scss from './FooterScreenC.module.scss';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';

export default function FooterScreenC({ architecturePageC }) {
  return (
    <div className={scss.footerScreenC}>
      <div className={scss.emailAndGeneralTextBlock}>
        <div className={scss.emailBlock}>
          <a href='mailto:k.syndicate@gmail.com'>
            <h5>k.syndicate@gmail.com</h5>
          </a>
        </div>
        <div className={scss.intermediaryBuyNow}>
          <IntermediaryBuyNow architecturePageC={architecturePageC} />
        </div>
        <div className={scss.generalTextBlock}>
          <p>
            IMAGES AND NAMES OF GAME PROJECTS RAID: SHADOW LEGENDS, SOLDIERS INC: MOBILE WARFARE,
            STORMFALL: RISE OF BALUR AND TOTAL DOMINATION - REBORN BELONG TO THEIR LEGAL RIGHT
            HOLDERS - PLARIUM GLOBAL LTD
          </p>
        </div>
      </div>
      <div className={scss.privatLinksblock}>
        <a href='#'>Privacy policy</a>
        <a href='#'>Privacy policy</a>
        <a href='#'>Privacy policy</a>
      </div>
      <div className={scss.iconsBlock}>
        <BsLinkedin className={scss.icon} />
        <BsTwitterX className={scss.icon} />
        <BsYoutube className={scss.icon} />
        <BsReddit className={scss.icon} />
        <BsWhatsapp className={scss.icon} />
      </div>
      <h6 className={scss.certificationText}>
        © 2025 - EDUCBA. ALL RIGHTS RESERVED. THE CERTIFICATION NAMES ARE THE TRADEMARKS OF THEIR
        RESPECTIVE OWNERS.
      </h6>
    </div>
  );
}
