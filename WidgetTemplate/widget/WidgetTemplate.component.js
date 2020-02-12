import React, {Component} from 'react';
import WidgetTemplateMainView from './components/WidgetTemplate.mainView';
import {mapComponentProps} from './WidgetTemplate.propsMappar';
export default class WidgetTemplateComponent extends Component {
  render() {
    return <WidgetTemplateMainView {...mapComponentProps(this.props)} />;
  }
}
