export default class DayTimesPropsMapper {
  constructor(props) {
    this.props = props;
  }
  mapComponentProps = props => {
    this.props = props;
    return {
      ...props,
    };
  };
}
