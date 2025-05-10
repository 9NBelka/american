import { BsLinkedin, BsReddit, BsTwitterX, BsWhatsapp, BsYoutube } from 'react-icons/bs';
import scss from './FooterScreenC.module.scss';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function FooterScreenC({ architecturePageC, scrollToSection }) {
  const footerC = true;
  return (
    <div className={scss.footerScreenC} id='footer'>
      <div className={scss.footerScreenBlocks}>
        <div className={scss.emailAndGeneralTextBlock}>
          <div className={scss.emailBlock}>
            <a href='mailto:k.syndicate@gmail.com'>
              <h5>k.syndicate@gmail.com</h5>
            </a>
          </div>

          <div className={scss.generalTextBlock}>
            <p>
              IMAGES AND NAMES OF GAME PROJECTS RAID: SHADOW LEGENDS, SOLDIERS INC: MOBILE WARFARE,
              STORMFALL: RISE OF BALUR AND TOTAL DOMINATION - REBORN BELONG TO THEIR LEGAL RIGHT
              HOLDERS - PLARIUM GLOBAL LTD
            </p>
          </div>
        </div>
        <div className={scss.emailAndGeneralTextBlock}>
          <div className={scss.emailBlockSchoolStory}>
            <h5>SCHOOL HISTORY</h5>
          </div>

          <div className={clsx(scss.generalTextBlock, scss.generalTextBlockSchoolStory)}>
            <p>
              We are a Ukrainian gamedev company founded in 2019. From the very beginning, our goal
              was to share professional knowledge and help beginners confidently enter the industry.
              During this time, we have created 6 full-fledged courses on Unity and Unreal Engine,
              graduated more than 1,500 students and recorded over 300 hours of educational content.
              Today, we are entering the international market and launching training for an
              English-speaking audience. We have something to tell the world - and we are ready to
              share our experience with those who dream of creating games.
            </p>
          </div>
        </div>
      </div>
      <div className={scss.intermediaryBuyNow}>
        <IntermediaryBuyNow
          architecturePageC={architecturePageC}
          footerC={footerC}
          scrollToSection={scrollToSection}
        />
      </div>
      <div className={scss.privatLinksblock}>
        <Link to='/privacy-policy'>Privacy policy</Link>
        <Link to='/privacy-policy'>Privacy policy</Link>
        <Link to='/privacy-policy'>Privacy policy</Link>
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
