import React, {Component} from 'react';
import DayTimesMainView from './components/DayTimes.mainView';
import {mapComponentProps} from './DayTimes.propsMappar';

export default class DayTimesComponent extends Component {
  render() {
    return <DayTimesMainView {...mapComponentProps(this.props)} />;
  }
}
