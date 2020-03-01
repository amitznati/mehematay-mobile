import React, {Component} from 'react';
import SearchLocationMainView from './components/SearchLocation.mainView';
import {mapComponentProps} from './SearchLocation.propsMappar';
export default class SearchLocationComponent extends Component {
  render() {
    return <SearchLocationMainView {...mapComponentProps(this.props)} />;
  }
}
