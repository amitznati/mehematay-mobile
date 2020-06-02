import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

const NextEvents = ({events}) => {
  const renderNextEvent = event => {
    return (
      <View style={{marginBottom: 10}} key={event.date.formattedDateHe}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#706F6C',
              fontFamily: 'Assistant-Bold',
              fontSize: 18,
              lineHeight: 18,
              borderBottomWidth: 1,
              borderBottomColor: '#8E3032',
              marginBottom: 4,
            }}>
            {event.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'Assistant-Regular',
                fontSize: 16,
                lineHeight: 16,
                color: '#706F6C',
                marginLeft: 10,
              }}>
              {event.date.formattedDateHe}
            </Text>
            <Text
              style={{
                fontFamily: 'Assistant-Regular',
                fontSize: 16,
                lineHeight: 16,
                color: '#706F6C',
              }}>
              {event.date.formattedDate}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Assistant-Regular',
              fontSize: 16,
              lineHeight: 16,
              color: '#706F6C',
            }}>
            {`כניסה ${event.enter}`}
          </Text>
          <Text
            style={{
              fontFamily: 'Assistant-Regular',
              fontSize: 16,
              lineHeight: 16,
              color: '#706F6C',
            }}>
            {`יציאה ${event.out}`}
          </Text>
        </View>
      </View>
    );
  };
  return events.map(renderNextEvent);
};

export default NextEvents;
