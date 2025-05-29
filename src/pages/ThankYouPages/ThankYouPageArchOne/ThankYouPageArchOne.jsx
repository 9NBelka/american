import { BsDiscord, BsLinkedin, BsReddit, BsTwitterX, BsWhatsapp, BsYoutube } from 'react-icons/bs';
import scss from './ThankYouPageArchOne.module.scss';
import clsx from 'clsx';

export default function ThankYouPageArchOne() {
  return (
    <div className={scss.backgroundThankPage}>
      <div className={scss.container}>
        <div className={scss.thankPageMainBlock}>
          <h1 className={scss.title}>THANK YOU!</h1>
          <p className={scss.textForLink}>
            To start training, follow the link in discord to contact our manager.
          </p>
          <a href='#' target='_blank' className={scss.discordButton}>
            Discord <BsDiscord className={scss.icon} />
          </a>
          <p className={clsx(scss.textForLink, scss.textForLinkSocial)}>
            Any questions left? Ask our speakers!
          </p>
          <a href='#' target='_blank' className={clsx(scss.discordButton, scss.mainSocialButton)}>
            Ask a question <BsWhatsapp className={scss.icon} />
          </a>
          <div className={scss.socialAndOurSitesBlock}>
            <div className={scss.socialBlock}>
              <h3>Connect With Us</h3>
              <div className={scss.socialIcons}>
                <BsLinkedin className={scss.socialIcon} />
                <BsTwitterX className={scss.socialIcon} />
                <BsYoutube className={scss.socialIcon} />
                <BsReddit className={scss.socialIcon} />
                <BsWhatsapp className={scss.socialIcon} />
              </div>
            </div>
            <div className={scss.socialBlock}>
              <h3>Visit our WebSite</h3>
              <a href='/architecture/a' className={scss.websiteButton}>
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
