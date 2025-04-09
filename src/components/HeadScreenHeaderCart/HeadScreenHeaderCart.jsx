import scss from './HeadScreenHeaderCart.module.scss';

export default function HeadScreenHeaderCart() {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <nav className={scss.navigationBlock}>
          <div className={scss.logoBlock}>
            <img src='/img/knowledgeSyndicateLogo.png' alt='Logo' />
          </div>
        </nav>
      </div>
    </header>
  );
}
