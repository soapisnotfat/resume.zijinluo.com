import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';
import util from './util';

class SkillItem extends Component {
  render() {
    return (
      <section className="skill-item item">
        <p>
          <span className="bold">{this.props.name}</span>:{' '}
          {this.props.items.join(', ')}
        </p>
      </section>
    );
  }
}

class Skill extends Component {
  render() {
    if (!toJS(appState.skill.data)) {
      return <div />;
    } else {
      return (
        appState.skill.show && (
          <Fade in={true} timeout={500}>
            <section className="skill" id="skills">
              <SectionHeader title="Skills" />
              {util.getListOf(SkillItem, toJS(appState.skill.data), false)}
            </section>
          </Fade>
        )
      );
    }
  }
}

SkillItem.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array
};

export default observer(Skill);
