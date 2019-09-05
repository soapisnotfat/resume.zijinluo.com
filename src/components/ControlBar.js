import React, { Component } from 'react';
import appState, { history } from '../store/appState';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';
import PropTypes from 'prop-types';
import Route from 'route-parser';
import SealIcon from '@material-ui/icons/Bookmark';
import Switch from '@material-ui/core//Switch';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  sealButton: {
    margin: 0,
    marginBottom: '5px',
    marginTop: '5px',
    color: '#B3A369'
  },
  pdfButton: {
    margin: 0,
    marginBottom: '5px',
    marginTop: '5px',
    background: '#EAAA00'
  },
  printButton: {
    margin: 0,
    marginBottom: '5px',
    marginTop: '5px',
    background: '#003057'
  },
  otherButton: {
    margin: 0,
    marginBottom: '5px',
    marginTop: '5px'
  }
};

class ControlBar extends Component {
  constructor(props) {
    super(props);
    this.routeParser = new Route('/:name');
  }

  onSwitchCVResume() {
    if (appState.featured) {
      history.push('/full');
    } else {
      history.push('/short');
    }
    appState.featured = !appState.featured;
    document.title = 'Zijin Luo - Resume';
  }

  onSwitchSeal() {
    appState.showSeal = !appState.showSeal;
  }

  render() {
    const classes = this.props.classes;
    return (
      <Fade in={true} timeout={500}>
        <Paper className='toolbar-paper' elevation={0}>
          <div className='should-feature'>
            <span>Full</span>
            <Switch
              color='primary'
              checked={appState.featured}
              onChange={this.onSwitchCVResume}
            />
            <span>One-page</span>
          </div>
          <Button
            className={classes.sealButton}
            variant='outlined'
            color='inherit'
            onClick={this.onSwitchSeal}
          >
            <SealIcon />
            {appState.showSeal ? 'hide seal' : 'show seal'}
          </Button>

          <Button
            className={classes.pdfButton}
            variant='contained'
            color='primary'
            onClick={() => {
              window.open(
                `${
                  appState.featured
                    ? appState.info.data.resume_download_url
                    : appState.info.data.cv_download_url
                }`,
                '_blank'
              );
            }}
          >
            <ArrowDownwardIcon /> PDF
          </Button>

          <Button
            className={classes.printButton}
            variant='contained'
            color='primary'
            onClick={() => {
              window.print();
            }}
          >
            <PrintIcon /> Print
          </Button>

          <Button
            className={classes.otherButton}
            variant='text'
            color='inherit'
            size='small'
            onClick={() => {
              window.open('https://me.zijinluo.com');
            }}
          >
            <ArrowBackIcon /> To My Website
          </Button>
        </Paper>
      </Fade>
    );
  }
}

ControlBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(observer(ControlBar));
