import React, { Component } from 'react';

import Fade from '@material-ui/core/Fade';
import { PropTypes } from 'prop-types';
import ReactMarkdown from 'react-markdown';
import SectionHeader from './SectionHeader';
import appState from '../store/appState';
import { getListOf } from './util';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

class EducationItem extends Component {
  getDate() {
    let result = `${this.props.startDate} to ${this.props.endDate}`;
    if (this.props.isCurrent) {
      result += ' (expected)';
    }
    return result;
  }

  render() {
    return (
      <section className='education-item item'>
        <h3 className='education-name name'>{this.props.name}</h3>
        <div className='education-date date'>{this.getDate()}</div>
        <ReactMarkdown
          className='education-notes notes markdown-body'
          source={this.props.notes.join('\n')}
        />
      </section>
    );
  }
}

class Education extends Component {
  render() {
    if (!toJS(appState.education.data)) {
      return <div />;
    } else {
      return (
        appState.education.show && (
          <Fade in={true} timeout={500}>
            <section className='education' id='education'>
              <SectionHeader title={'Education'} />
              {getListOf(
                EducationItem,
                toJS(appState.education.data),
                appState.featured
              )}
            </section>
          </Fade>
        )
      );
    }
  }
}

EducationItem.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isCurrent: PropTypes.bool,
  name: PropTypes.string,
  notes: PropTypes.array
};

export default observer(Education);
