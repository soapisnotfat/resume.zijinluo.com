import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Award from '../components/Award';
import ControlBar from '../components/ControlBar';
import CourseWork from '../components/CourseWork';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Header from '../components/Header';
import Project from '../components/Project';
import Publication from '../components/Publication';
import Skills from '../components/Skill';
import util from '../components/util';
import '../styles/App.scss';
import '../styles/markdown-github.css';

export default class Paper extends Component {
  componentDidMount() {
    util.dataQuery(util.query).then(data => util.setupData(data));
  }

  render() {
    return (
      <main>
        <aside className='toolbar'>
          <ControlBar />
        </aside>
        <article
          className={classNames(
            'cv-page',
            {
              resume: this.props.featured
            },
            'markdown-body'
          )}
        >
          <header>
            <Header />
          </header>

          <Education />
          <Experience />
          <Publication />
          <CourseWork />
          <Award />
          <Project />
          <Skills />

          <footer />
        </article>
      </main>
    );
  }
}

Paper.propTypes = {
  featured: PropTypes.bool
};
Paper.defaultProps = { featured: false };
