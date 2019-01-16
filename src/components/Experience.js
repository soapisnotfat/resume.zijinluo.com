import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';
import util from './util';

class ExperienceItem extends Component {
  getDate() {
    let result = `${this.props.startDate} to `;
    if (this.props.endDate) {
      result += this.props.endDate;
    } else {
      result += 'Present';
    }
    return result;
  }

  render() {
    return (
      <section className="experience-item item">
        <h3 className="experience-title name"> {this.props.title} </h3>
        <div className="meta-row">
          <h4 className="experience-company company">
            <a href={this.props.companyLink}>{this.props.company}</a>
          </h4>
          <h4 className="experience-location location">
            {this.props.location}
          </h4>
          {/* <h6 className="experience-skills skills">
            {this.props.skills}
          </h6> */}
        </div>
        <div className="experience-date date">{this.getDate()}</div>
        <ReactMarkdown
          className="experience-notes notes markdown-body"
          source={this.props.notes.join('\n')}
        />
      </section>
    );
  }
}

class Experience extends Component {
  render() {
    if (!toJS(appState.experience.data)) {
      return <div />;
    } else {
      return (
        appState.experience.show && (
          <Fade in={true} timeout={500}>
            <section className="experience" id="experience">
              <SectionHeader title={'Experience'} />
              {util.getListOf(
                ExperienceItem,
                toJS(appState.experience.data),
                appState.featured
              )}
            </section>
          </Fade>
        )
      );
    }
  }
}

ExperienceItem.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  companyLink: PropTypes.string,
  location: PropTypes.string,
  notes: PropTypes.array
};

export default observer(Experience);
