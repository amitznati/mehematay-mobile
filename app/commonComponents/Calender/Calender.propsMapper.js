import Hebcal from 'hebcal';
import {monthsArrayHe, monthsArray} from '../constants';

export default class CalenderPropsMapper {
  constructor(props) {
    this.props = props;
  }

  mapProps = props => {
    this.props = props;
    return {
      ...props,
      monthAndYearNavigationProps: this.getMonthAndYearNavigationProps(),
      weekNavigationProps: this.getWeekNavigationProps(),
      selectedWeek: this.getSelectedWeek(),
      onSelectDate: this.onSelectDate,
      onSelectYear: this.onSelectYear,
      onSelectMonth: this.onSelectMonth,
      monthSelectModalProps: this.getMonthSelectModalProps(),
      yearSelectModalProps: this.getYearSelectModalProps(),
      calenderWeeks: this.getCalenderWeeks(),
    };
  };

  onSelectDate = date => {
    const {setSelectedDate, setNavigationDate} = this.props;
    setSelectedDate(date);
    setNavigationDate(date);
  };

  onSelectYear = year => {
    const {navigationDate, setNavigationDate} = this.props;
    const newNavigationDate = new Date(navigationDate);
    newNavigationDate.setFullYear(year);
    setNavigationDate(newNavigationDate);
  };
  onSelectMonth = month => {
    const {navigationDate, setNavigationDate} = this.props;
    const newNavigationDate = new Date(navigationDate);
    newNavigationDate.setMonth(month);
    setNavigationDate(newNavigationDate);
  };

  getMonthAndYearNavigationProps = () => {
    const {navigationDate} = this.props;
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

  getWeekNavigationProps = () => {
    const {navigationDate, selectedLocation} = this.props;
    const sunday = new Date(navigationDate);
    sunday.setDate(sunday.getDate() - navigationDate.getDay());
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    const heFromDate = new Hebcal.HDate(sunday);
    const heToDate = new Hebcal.HDate(saturday);
    if (selectedLocation && selectedLocation.coords && heFromDate && heToDate) {
      heFromDate.setLocation(
        selectedLocation.coords.latitude,
        selectedLocation.coords.longitude,
      );
      heToDate.setLocation(
        selectedLocation.coords.latitude,
        selectedLocation.coords.longitude,
      );
    }
    const toDayHe = Hebcal.gematriya(heToDate.day);
    const fromDayHe = Hebcal.gematriya(heFromDate.day);
    const monthNameHe = monthsArrayHe[heToDate.month - 1];
    const monthName = monthsArray[saturday.getMonth()];
    const yearHe = Hebcal.gematriya(heFromDate.year);
    const year = saturday.getFullYear();
    const heStr = `${fromDayHe}-${toDayHe} ${monthNameHe} ${yearHe} ${heToDate.getSedra(
      'h',
    )}`;
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

  getSelectedWeek = () => {
    const {selectedLocation, navigationDate, selectedDate} = this.props;
    const heDate = new Hebcal.HDate(navigationDate);
    const holidays = new Hebcal(heDate.year).holidays;
    const sunday = new Date(navigationDate);
    sunday.setDate(sunday.getDate() - navigationDate.getDay());
    return [0, 1, 2, 3, 4, 5, 6].map(day => {
      const next = new Date(sunday);
      next.setDate(sunday.getDate() + day);
      const selected =
        next.getDate() === selectedDate.getDate() &&
        next.getMonth() === selectedDate.getMonth() &&
        next.getFullYear() === selectedDate.getFullYear();
      const key = `${next.getDate()}-${next.getMonth() + 1}`;
      return {
        date: {
          day: next.getDate(),
          year: next.getFullYear(),
          month: next.getMonth() + 1,
        },
        selected,
        isVisible: true,
        onSelect: this.onSelectDate,
        selectedLocation,
        key,
        holidays,
      };
    });
  };

  getMonthSelectModalProps = () => {
    const {navigationDate} = this.props;
    const months = Hebcal.range(0, 11).map(monthIndex => {
      const date = new Date(navigationDate);
      date.setMonth(monthIndex);
      date.setDate(1);
      const heDate = new Hebcal.HDate(date);
      return {
        key: monthIndex,
        title: `${monthsArray[monthIndex]} ~ ${
          monthsArrayHe[heDate.month - 1]
        }`,
      };
    });
    return {
      months,
      defaultIndex: navigationDate.getMonth(),
    };
  };

  getYearSelectModalProps = () => {
    const {navigationDate} = this.props;
    const years = Hebcal.range(
      navigationDate.getFullYear() - 100,
      navigationDate.getFullYear() + 100,
    );
    const yearText = year => {
      const heYear = Hebcal.gematriya(
        new Hebcal.HDate(new Date(year, 1, 1)).year,
      );
      return `${year} ${heYear}`;
    };

    const data = years.map(year => ({key: year, title: yearText(year)}));
    return {
      data,
      defaultIndex: years.indexOf(navigationDate.getFullYear()),
    };
  };

  getCalenderWeeks = () => {
    const {navigationDate, selectedLocation, selectedDate} = this.props;
    const heDate = new Hebcal.HDate(navigationDate);
    const holidays = new Hebcal(heDate.year).holidays;
    const startDate = new Date(navigationDate);
    startDate.setDate(1);
    const weeks = Hebcal.range(0, 5).map(week => {
      return Hebcal.range(0, 6).map(dayInWeek => {
        const isVisible =
          startDate.getDay() === dayInWeek &&
          startDate.getMonth() === navigationDate.getMonth();
        const date = {
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        };
        const selected =
          selectedDate.getFullYear() === startDate.getFullYear() &&
          selectedDate.getMonth() === startDate.getMonth() &&
          selectedDate.getDate() === startDate.getDate();
        isVisible && startDate.setDate(startDate.getDate() + 1);
        return {
          date,
          selected,
          isVisible,
          selectedLocation,
          holidays,
        };
      });
    });
    return {
      weeks,
    };
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
