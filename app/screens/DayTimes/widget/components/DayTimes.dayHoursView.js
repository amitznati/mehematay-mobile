import React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import {TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';

export default function DayHoursView({dayTimes = []}) {
  if (dayTimes.length) {
    dayTimes.find(t => t.key === 'dayHour').description = (
      <TouchableOpacity>
        <Text style={{color: '#706F6C', fontFamily: 'Assistant-Light'}}>
          שעה זמנית לפי הגר"א מחושבת ע"י זמן זריחה עד זמן שקיעה לחלק ל 12
          שעות...
          <Text style={{color: '#3d61cd'}}>פרטים</Text>
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <Timeline
      listViewContainerStyle={{paddingBottom: 16}}
      circleSize={20}
      circleColor="#8E3032"
      lineColor="#8E3032"
      timeContainerStyle={{minWidth: 52}}
      timeStyle={{
        fontFamily: 'Assistant-Regular',
        textAlign: 'center',
        backgroundColor: '#8E3032',
        color: '#F3EDD0',
        padding: 5,
        borderRadius: 13,
      }}
      titleStyle={{color: '#706F6C', fontFamily: 'Assistant-Bold'}}
      descriptionStyle={{color: '#706F6C', fontFamily: 'Assistant-Light'}}
      data={dayTimes}
    />
  );
}
