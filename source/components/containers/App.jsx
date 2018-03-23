import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FlatButton from 'material-ui/FlatButton';
import NeoObjects from '../NeoObjects/NeoObjects';
import moment from 'moment';
import { withRouter } from 'react-router';

import styles from './Neo.styl';
import config from 'configs/app.config';
import LinearProgress from 'material-ui/LinearProgress';

import { getNeo } from '../../redux/actions/neo';

const mapDispatchToProps = (dispatch: Object) => {
  return {
    getNeos: (startDate: string, endDate: string) => {
      dispatch(getNeo(startDate, endDate));
    }
  };
};

@withRouter
@connect(null, mapDispatchToProps)
@CSSModules(styles, config.cssModules)
class Neo extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    getNeos: PropTypes.func,
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      timer: 10,
      proccessStart: false
    };
    this.interval = null;
    this.day = 0;
  }

  startFetch() {
    //const currentDate = moment().format('YYYY-MM-DD');
    const currentDay = Number(moment().format('DD'));
    const currentMonth = Number(moment().format('MM'));
    const currentYear = Number(moment().format('YYYY'));
    const firstDay = Number(moment().startOf('month').format('DD'));
    this.day = firstDay;
    this.interval = setInterval(() => {
      if (this.day <= currentDay) {
        const startDate = `${currentYear}-${currentMonth}-${this.day}`;
        this.day += 1;
        this.props.getNeos(startDate, startDate);
      } else {
        clearInterval(this.interval);
      }
    }, 5000);
    this.setState({proccessStart: true});
  }

  stopFetch() {
    clearInterval(this.interval);
    this.setState({proccessStart: false});
  }

  render() {
    const preloaderParams = this.state.proccessStart ? { mode: 'indeterminate', key: 'l1' } : { mode: 'determinate', value: 0, key: 'l2' };
    return (
      <div className='app-wrapper'>
        <div className='app-container'>
          <div styleName='neo-content'>
              <FlatButton label='Start fetching Neo' onClick={() => this.startFetch()} />
              <FlatButton label='Stop fetching Neo' onClick={() => this.stopFetch()} />
              <LinearProgress {...preloaderParams} />
              <NeoObjects />
          </div>
        </div>
      </div>
    );
  }
}

export default Neo;
