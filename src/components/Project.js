import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';
import { getListOf } from './util';

class ProjectItem extends Component {
  render() {
    return (
      <section className='project-item item'>
        <h3 className='project-title name'>{this.props.title}</h3>
        <div className='project-date date'>{this.props.date}</div>
        <ReactMarkdown
          className='project-notes notes markdown-body'
          source={this.props.notes.join('\n')}
        />
      </section>
    );
  }
}

class Project extends Component {
  render() {
    if (!toJS(appState.project.data)) {
      return <div />;
    } else {
      return (
        appState.project.show && (
          <Fade in={true} timeout={500}>
            <section className='project' id='project'>
              <SectionHeader title={'Projects'} />
              {getListOf(
                ProjectItem,
                toJS(appState.project.data),
                appState.featured
              )}
            </section>
          </Fade>
        )
      );
    }
  }
}

ProjectItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  notes: PropTypes.array
};

export default observer(Project);
