import React, { Component } from "react";

import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import SectionHeader from "./SectionHeader";
import appState from "../store/appState";
import { getListOf } from "./util";
import { observer } from "mobx-react";
import { toJS } from "mobx";

class SkillItem extends Component {
  render() {
    return (
      <section className="skill-item item">
        <p>
          <span className="bold">{this.props.name}</span>:{" "}
          {this.props.items.join(", ")}
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
              {getListOf(SkillItem, toJS(appState.skill.data), false)}
            </section>
          </Fade>
        )
      );
    }
  }
}

SkillItem.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default observer(Skill);
