import React from 'react';
import Timeline from 'react-native-timeline-flatlist';

export default function DayHoursView({dayTimes = []}) {
  console.log(dayTimes);
  return (
    <Timeline
      listViewContainerStyle={{paddingBottom: 40, paddingTop: 15}}
      circleSize={20}
      circleColor="rgb(45,156,219)"
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{minWidth: 52}}
      timeStyle={{
        textAlign: 'center',
        backgroundColor: '#ff9797',
        color: 'white',
        padding: 5,
        borderRadius: 13,
      }}
      descriptionStyle={{color: 'gray', minHeight: 200}}
      options={{
        style: {paddingTop: 15, paddingBottom: 15},
      }}
      data={dayTimes}
    />
  );
}
