import { BsLinkedin, BsReddit, BsTwitterX, BsWhatsapp, BsYoutube } from 'react-icons/bs';
import scss from './FooterScreenB.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function FooterScreenB({ imageLogo }) {
  return (
    <div className={scss.footerMain}>
      <div className={clsx(scss.footerColumn, scss.firstChild)}>
        <img src={imageLogo.logoCourse} alt={`${imageLogo.nameCourse} logo`} />
        <h6 className={scss.footerScreenGeneralInfo}>
          © 2025 - EDUCBA. ALL RIGHTS RESERVED. THE CERTIFICATION NAMES ARE THE TRADEMARKS OF THEIR
          RESPECTIVE OWNERS.
        </h6>
      </div>
      <div className={scss.footerColumnRow}>
        <div className={scss.footerColumn}>
          <h4>Important Links</h4>
          <div className={scss.footerScreenBlockInfo}>
            <Link to='/privacy-policy'>
              <h6>Privacy Policy</h6>
            </Link>
            <Link to='/privacy-policy'>
              <h6>Privacy Policy</h6>
            </Link>
            <Link to='/privacy-policy'>
              <h6>Privacy Policy</h6>
            </Link>
          </div>
        </div>
        <div className={clsx(scss.footerColumn, scss.footerColumnNone)}>
          <h4>Company</h4>
          <div className={scss.footerScreenBlockInfo}>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <h6>Contact Us</h6>
            </a>
          </div>
        </div>
        <div className={scss.footerColumn}>
          <h4>Social media</h4>
          <div className={scss.footerScreenBlockIcons}>
            <BsLinkedin className={scss.footerScreenBlockIcon} />
            <BsTwitterX className={scss.footerScreenBlockIcon} />
            <BsYoutube className={scss.footerScreenBlockIcon} />
            <BsReddit className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
          </div>
          <div className={clsx(scss.footerColumn, scss.footerColumnPhone)}>
            <h4>Company</h4>
            <div className={scss.footerScreenBlockInfo}>
              <a href='#' target='_blank' rel='noopener noreferrer'>
                <h6>Contact Us</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
