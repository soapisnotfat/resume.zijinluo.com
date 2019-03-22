import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';
import util from './util';

class AwardItem extends Component {
  render() {
    return (
      <section className=' item'>
        <h3 className='award-title name'>{this.props.title}</h3>
        <p className='award-awarded-by'>{this.props.awardedBy}</p>
        <div className='award-date date'>{this.props.date}</div>
        <ReactMarkdown
          className='award-notes notes markdown-body'
          source={this.props.notes.join('\n')}
        />
      </section>
    );
  }
}

class Award extends Component {
  render() {
    if (!toJS(appState.award.data)) {
      return <div />;
    } else {
      return (
        appState.award.show && (
          <Fade in={true} timeout={500}>
            <section className='award' id='awards'>
              <SectionHeader title={'Awards'} />
              {util.getListOf(
                AwardItem,
                toJS(appState.award.data),
                appState.featured
              )}
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
  notes: PropTypes.array
};

export default observer(Award);
