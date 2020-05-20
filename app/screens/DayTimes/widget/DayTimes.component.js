import React, {Component} from 'react';
import DayTimesMainView from './components/DayTimes.mainView';
import PropsMapper from './DayTimes.propsMapper';
import DayTimesMockRedux from './components/DayTimeMock.redux';

export default class DayTimesComponent extends Component {
  constructor(props) {
    super(props);
    this.propsMapper = new PropsMapper(props);
  }
  componentDidMount() {
    const {loadSunTimesCurrentLocation} = this.props;
    loadSunTimesCurrentLocation();
  }

  render() {
    return (
      <DayTimesMockRedux {...this.propsMapper.mapComponentProps(this.props)} />
    );
  }
}
