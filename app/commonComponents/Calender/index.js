import React from 'react';
import CalenderPropsMapper from './Calender.propsMapper';
import Calender from './Calender';

export default class CalenderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.propsMapper = new CalenderPropsMapper(props);
  }

  render() {
    return <Calender {...this.propsMapper.mapProps(this.props)} />;
  }
}
