import Hebcal from 'hebcal';
import {monthsArrayHe, monthsArray} from '../constants';

export default class CalenderPropsMapper {
  constructor(props) {
    this.props = props;
  }

  mapProps = props => {
    const {navigationDate, selectedDate} = props;
    return {
      ...props,
      monthAndYearNavigationProps: this.getMonthAndYearNavigationProps(
        navigationDate,
      ),
      weekNavigationProps: this.getWeekNavigationProps(navigationDate),
      selectedWeek: this.getSelectedWeek(navigationDate, selectedDate),
      navigationDate,
      selectedDate,
      onSelectDate: this.onSelectDate,
    };
  };

  onSelectDate = date => {
    const {setSelectedDate, setNavigationDate} = this.props;
    setSelectedDate(date);
    setNavigationDate(date);
  };

  getMonthAndYearNavigationProps = navigationDate => {
    const heDate = new Hebcal.HDate(navigationDate);
    return {
      month: {
        next: {
          mainValue: monthsArrayHe[heDate.month === 12 ? 0 : heDate.month],
          secondaryValue:
            monthsArray[
              navigationDate.getMonth() + 1 === 12
                ? 0
                : navigationDate.getMonth() + 1
            ],
          clickAction: () =>
            this.navigateAction({type: 'month', side: 'next'}, navigationDate),
        },
        main: {
          mainValue: monthsArrayHe[heDate.month - 1],
          secondaryValue: monthsArray[navigationDate.getMonth()],
          clickAction: () =>
            this.navigateAction({type: 'month', side: 'main'}, navigationDate),
        },
        prev: {
          mainValue: monthsArrayHe[heDate.month === 1 ? 11 : heDate.month - 2],
          secondaryValue:
            monthsArray[
              navigationDate.getMonth() === 0
                ? 11
                : navigationDate.getMonth() - 1
            ],
          clickAction: () =>
            this.navigateAction({type: 'month', side: 'prev'}, navigationDate),
        },
      },
      year: {
        next: {
          mainValue: Hebcal.gematriya(heDate.year + 1),
          secondaryValue: navigationDate.getFullYear() + 1,
          clickAction: () =>
            this.navigateAction({type: 'year', side: 'next'}, navigationDate),
        },
        main: {
          mainValue: Hebcal.gematriya(heDate.year),
          secondaryValue: navigationDate.getFullYear(),
          clickAction: () =>
            this.navigateAction({type: 'year', side: 'main'}, navigationDate),
        },
        prev: {
          mainValue: Hebcal.gematriya(heDate.year - 1),
          secondaryValue: navigationDate.getFullYear() - 1,
          clickAction: () =>
            this.navigateAction({type: 'year', side: 'prev'}, navigationDate),
        },
      },
    };
  };

  getWeekNavigationProps = navigationDate => {
    const sunday = new Date(navigationDate);
    sunday.setDate(sunday.getDate() - navigationDate.getDay());
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    const heFromDate = new Hebcal.HDate(sunday);
    const heToDate = new Hebcal.HDate(saturday);
    const toDayHe = Hebcal.gematriya(heToDate.day);
    const fromDayHe = Hebcal.gematriya(heFromDate.day);
    const monthNameHe = monthsArrayHe[heToDate.month - 1];
    const monthName = monthsArray[saturday.getMonth()];
    const yearHe = Hebcal.gematriya(heFromDate.year);
    const year = saturday.getFullYear();
    const heStr = `${fromDayHe}-${toDayHe} ${monthNameHe} ${yearHe}`;
    const enStr = `${year} ${monthName} ${saturday.getDate()}-${sunday.getDate()}`;
    return {
      main: {
        mainValue: heStr,
        secondaryValue: enStr,
      },
      next: {
        clickAction: () =>
          this.navigateAction({type: 'week', side: 'next'}, navigationDate),
      },
      prev: {
        clickAction: () =>
          this.navigateAction({type: 'week', side: 'prev'}, navigationDate),
      },
    };
  };

  getSelectedWeek = (navigationDate, selectedDay) => {
    const sunday = new Date(navigationDate);
    sunday.setDate(sunday.getDate() - navigationDate.getDay());
    return [0, 1, 2, 3, 4, 5, 6].map(day => {
      const next = new Date(sunday);
      next.setDate(sunday.getDate() + day);
      const selected =
        next.getDate() === selectedDay.getDate() &&
        next.getMonth() === selectedDay.getMonth() &&
        next.getFullYear() === selectedDay.getFullYear();
      return {
        date: {
          day: next.getDate(),
          year: next.getFullYear(),
          month: next.getMonth() + 1,
        },
        selected,
      };
    });
  };

  navigateAction = ({type, side}, navigationDate) => {
    const {setNavigationDate} = this.props;
    const newDate = new Date(navigationDate);
    const addToType = () => {
      if (side === 'main') {
        return 0;
      }
      return side === 'next' ? 1 : -1;
    };
    if (type === 'year') {
      newDate.setFullYear(newDate.getFullYear() + addToType());
    } else if (type === 'month') {
      newDate.setMonth(newDate.getMonth() + addToType());
    } else if (type === 'week') {
      newDate.setDate(newDate.getDate() + addToType() * 7);
    }
    setNavigationDate(newDate);
  };
}
