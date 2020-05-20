import Hebcal from 'hebcal';
import {monthsArrayHe, monthsArray} from '../../../commonComponents/constants';

export default class DayTimesPropsMapper {
  constructor(props) {
    this.props = props;
  }
  mapComponentProps = props => {
    const {selectedDate} = props;
    return {
      ...props,
      selectedDateFormatted: this.getSelectedDateFormats(selectedDate),
    };
  };
  getSelectedDateFormats = selectedDate => {
    const heDate = new Hebcal.HDate(selectedDate);
    return {
      formattedDate: `${selectedDate.getDate()} ${
        monthsArray[selectedDate.getMonth()]
      } ${selectedDate.getFullYear()}`,
      formattedDateHe: `${Hebcal.gematriya(heDate.day)} ${
        monthsArrayHe[heDate.month - 1]
      } ${Hebcal.gematriya(heDate.year)}`,
    };
  };
}
