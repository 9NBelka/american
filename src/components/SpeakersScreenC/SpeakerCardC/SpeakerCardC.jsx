import scss from './SpeakerCardC.module.scss';

export default function SpeakerCardC({ speaker }) {
  return (
    <div className={scss.speakerCard}>
      <div className={scss.speakerCardBlock}>
        <div className={scss.speakerImageContainer}>
          <img src={speaker.image} alt={speaker.name} className={scss.speakerImage} />
        </div>
        <h5 className={scss.nameTag}>Speaker</h5>
        <h3 className={scss.nameSpeaker}>{speaker.name}</h3>
        <div className={scss.speakerCardDescription}>
          <p>{speaker.experience}</p>
          <p>{speaker.position}</p>
          <p className={scss.phoneMarg}>{speaker.previous}</p>
        </div>
      </div>
      <a
        className={scss.linkedin}
        href={speaker.linkedin}
        target='_blank'
        rel='noopener noreferrer'>
        <img
          src='https://lms.k-syndicate.school/wp-content/uploads/2024/02/linkedIn-esc.png'
          alt='LinkedIn'
        />
      </a>
    </div>
  );
}
