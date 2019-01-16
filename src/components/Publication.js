import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import appState from '../store/appState';
import SectionHeader from './SectionHeader';

class PublicationItem extends Component {
  getLinks() {
    return Object.keys(this.props.links).map(key => {
      return (
        this.props.links[key] && (
          <span key={key}>
            [<a href={this.props.links[key]}>{key}</a>]
          </span>
        )
      );
    });
  }

  getAuthor(name) {
    let author = this.props.people.find(author => {
      return author.names.findIndex(e => e === name) !== -1;
    });
    if (author === undefined) {
      author = {
        link: `https://www.google.com/search?q=${name}`
      };
    }
    return author;
  }

  getAuthors() {
    return this.props.authors.map((key, i) => {
      let author = this.getAuthor(key);
      return (
        <span key={i}>
          <a href={author.link} className={author.me ? 'publication-me' : null}>
            {key}
          </a>
          {i === this.props.authors.length - 1 ? null : ', '}
        </span>
      );
    });
  }

  render() {
    return (
      <section className="publication-item item">
        <h3 className="publication-title name">
          {this.props.title} {this.getLinks()}
        </h3>
        <div className="date">{this.props.date}</div>
        <p className="authors">{this.getAuthors()}</p>
        <p className="venue">{this.props.venue}</p>
        {this.props.notes && (
          <ReactMarkdown
            className="experience-notes notes markdown-body"
            source={this.props.notes.join('\n')}
          />
        )}
      </section>
    );
  }
}

class Publication extends Component {
  getListOf = (component, dataArray, peoples, featured = false) => {
    dataArray = dataArray.filter(e => !e.archived);
    dataArray = featured ? dataArray.filter(e => e.featured) : dataArray;
    return dataArray.map((e, i) =>
      React.createElement(component, { ...{ ...e, key: i }, people: peoples })
    );
  };

  render() {
    if (!toJS(appState.publication.data) || !toJS(appState.people.data)) {
      return <div />;
    } else {
      return (
        appState.publication.show && (
          <Fade in={true} timeout={500}>
            <section className="publication" id="publication">
              <SectionHeader title={'Publication'} />
              {this.getListOf(
                PublicationItem,
                toJS(appState.publication.data),
                toJS(appState.people.data),
                appState.featured
              )}
            </section>
          </Fade>
        )
      );
    }
  }
}

PublicationItem.propTypes = {
  links: PropTypes.object,
  authors: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
  venue: PropTypes.string,
  notes: PropTypes.array
};

export default observer(Publication);
