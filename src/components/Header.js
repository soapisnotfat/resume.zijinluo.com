import Fade from '@material-ui/core/Fade';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import seal from '../gt-seal.svg';
import appState from '../store/appState';

function DesktopOrMobile({ mobile, desktop }) {
  return [
    <span key='desktop' className='show-desktop'>
      {desktop}
    </span>,
    <span key='mobile' className='show-mobile'>
      {mobile}
    </span>
  ];
}

class Header extends Component {
  getFullName = () => {
    const info = toJS(appState.info.data);
    return (
      `${info.firstName}` +
      (info.preferredName ? ` "${info.preferredName}" ` : ' ') +
      `${info.lastName}`
    );
  };

  getLegalName = () => {
    const info = toJS(appState.info.data);
    return `${info.firstName} ${info.lastName}`;
  };

  render() {
    const info = toJS(appState.info.data);

    if (!info) {
      return (
        <div>
          {appState.showSeal && <img className='logo' src={seal} alt='' />}
        </div>
      );
    } else {
      return (
        <Fade in={true} timeout={500}>
          <div>
            <h1>{this.getFullName()}</h1>
            <p className='info'>
              {info.position}
              <DesktopOrMobile mobile={<br />} desktop={' · '} />
              <a href={`mailto:${info.primary_email}`}>{info.primary_email}</a>
              {/* <DesktopOrMobile mobile={<br />} desktop={' · '} />
            {info.phone} */}
              <DesktopOrMobile mobile={<br />} desktop={' · '} />
              {info.location}
              <br />
              websites:{' '}
              <a
                href={info.website_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {info.website_url.split('//').pop()}
              </a>
              <DesktopOrMobile mobile={<br />} desktop={' · '} />
              github:{' '}
              <a
                href={info.github_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {info.github_url.split('//').pop()}
              </a>
              <DesktopOrMobile mobile={<br />} desktop={' · '} />
              blog:{' '}
              <a href={info.blog_url} target='_blank' rel='noopener noreferrer'>
                {info.blog_url.split('//').pop()}
              </a>
            </p>
            {appState.showSeal && <img className='logo' src={seal} alt='' />}
          </div>
        </Fade>
      );
    }
  }
}

export default observer(Header);
