import React from 'react';
import DayTimesMainView from './components/DayTimes.mainView';
import PropsMapper from './DayTimes.propsMapper';

export default class DayTimesComponent extends React.Component {
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
      <DayTimesMainView {...this.propsMapper.mapComponentProps(this.props)} />
    );
  }
}
