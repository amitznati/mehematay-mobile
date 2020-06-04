import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@ui-kitten/components';

export default function NextPrevNavigator({main, next, prev}) {
  const Side = ({side, mainValue, secondaryValue, clickAction}) => {
    const isNext = side === 'next';
    return (
      <TouchableOpacity
        onPress={clickAction}
        style={styles.switchMonthViewSideWrap}>
        {isNext && <Text style={styles.weekNavigationArrow}></Text>}
        <View style={styles.switchMonthViewTextWrap}>
          {mainValue && (
            <Text style={styles.switchMonthViewSideText}>{mainValue}</Text>
          )}
          {secondaryValue && (
            <Text
              style={[
                styles.switchMonthViewSideText,
                styles.switchMonthViewSideTextSecondary,
              ]}>
              {secondaryValue}
            </Text>
          )}
        </View>
        {!isNext && <Text style={styles.weekNavigationArrow}></Text>}
      </TouchableOpacity>
    );
  };

  const MainValue = ({mainValue, secondaryValue, clickAction}) => {
    return (
      <TouchableOpacity
        style={styles.switchMonthViewTextWrap}
        onPress={clickAction}>
        {mainValue && (
          <Text style={styles.weekNavigationText}>{mainValue}</Text>
        )}
        {secondaryValue && (
          <Text
            style={[styles.weekNavigationText, styles.weekNavigationTextEn]}>
            {secondaryValue}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.switchMonthView}>
      <Side {...next} side="next" />
      <MainValue {...main} />
      <Side {...prev} side="prev" />
    </View>
  );
}

const styles = StyleSheet.create({
  switchMonthView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  switchMonthViewSideWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekNavigationArrow: {
    fontFamily: 'FontAwesome5_Solid',
    fontSize: 30,
    color: '#F3EDD0',
    lineHeight: 50,
  },
  switchMonthViewTextWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  switchMonthViewSideText: {
    fontFamily: 'Assistant-Light',
    color: '#706F6C',
    fontSize: 18,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  switchMonthViewSideTextSecondary: {
    fontSize: 14,
  },
  weekNavigationText: {
    fontFamily: 'Assistant-Light',
    color: '#F3EDD0',
    fontSize: 24,
    lineHeight: 30,
  },
  weekNavigationTextEn: {
    fontSize: 18,
    lineHeight: 18,
  },
});
