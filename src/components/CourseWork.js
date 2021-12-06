import React, { Component } from "react";

import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import SectionHeader from "./SectionHeader";
import appState from "../store/appState";
import { getListOf } from "./util";
import { observer } from "mobx-react";
import { toJS } from "mobx";

class CourseWorkItem extends Component {
  render() {
    return (
      <section className="courseWork-item item">
        <p>
          <span className="bold">{this.props.name}</span>:{" "}
          {this.props.items.join(", ")}
        </p>
      </section>
    );
  }
}

class courseWork extends Component {
  render() {
    const data = toJS(appState.coursework.data);

    if (!data) {
      return <div />;
    } else {
      return (
        appState.coursework.show && (
          <Fade in={true} timeout={500}>
            <section className="courseWork" id="courseWork">
              <SectionHeader title="Course Work" />
              {getListOf(CourseWorkItem, data, false)}
            </section>
          </Fade>
        )
      );
    }
  }
}

CourseWorkItem.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default observer(courseWork);
