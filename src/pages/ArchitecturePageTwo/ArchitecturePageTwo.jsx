import css from './ArchitecturePageTwo.module.css';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import { useState } from 'react';
import ViewCourseScreenB from '../../components/ViewCourseScreenB/ViewCourseScreenB';

export default function ArchitecturePageOne({ currentInfo, scrollToSection, architecturePageB }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={css.mainBackground}>
      <div className={css.backgroundHeadScreen}>
        <HeadScreenHeader
          currentInfo={currentInfo}
          scrollToSection={scrollToSection}
          architecturePageB={architecturePageB}
        />
        <div className={css.container}>
          <HeadScreenTitle
            infoTitleAboutCourse={currentInfo}
            architecturePageB={architecturePageB}
            toggleModal={toggleModal}
            isOpen={isOpen}
          />
        </div>
      </div>
      <div className={css.container}>
        <h3 className={css.titleScreens} id='forWhom'>
          Course Overview
        </h3>
        <ViewCourseScreenB viewCourseInfo={currentInfo} architecturePageB={architecturePageB} />
      </div>
    </div>
  );
}
