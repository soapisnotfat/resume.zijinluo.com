import React, { Component } from "react";

import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import ReactMarkdown from "react-markdown";
import SectionHeader from "./SectionHeader";
import appState from "../store/appState";
import { getListOf } from "./util";
import { observer } from "mobx-react";
import { toJS } from "mobx";

class AwardItem extends Component {
  render() {
    return (
      <section className=" item">
        <h3 className="award-title name">{this.props.title}</h3>
        <p className="award-awarded-by">{this.props.awardedBy}</p>
        <div className="award-date date">{this.props.date}</div>
        <ReactMarkdown
          className="award-notes notes markdown-body"
          source={this.props.notes.join("\n")}
        />
      </section>
    );
  }
}

class Award extends Component {
  render() {
    const data = toJS(appState.award.data);

    if (!data) {
      return <div />;
    } else {
      return (
        appState.award.show && (
          <Fade in={true} timeout={500}>
            <section className="award" id="awards">
              <SectionHeader title={"Awards"} />
              {getListOf(AwardItem, data, appState.featured)}
            </section>
          </Fade>
        )
      );
    }
  }
}

AwardItem.propTypes = {
  title: PropTypes.string,
  awardedBy: PropTypes.string,
  date: PropTypes.string,
  notes: PropTypes.array,
};

export default observer(Award);
