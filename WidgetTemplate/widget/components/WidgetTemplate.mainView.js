import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
});

export default function WidgetTemplateMainView(props) {
  return (
    <View style={styles.root} {...props}>
      main view
    </View>
  );
}
