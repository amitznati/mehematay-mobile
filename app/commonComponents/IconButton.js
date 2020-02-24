import React from 'react';
import {Icon, useTheme} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function IconButton(props) {
  const theme = useTheme();
  const size = props.size || 50;
  const pack = props.pack || 'material';
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      borderRadius: size,
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
    },
    icon: {
      width: size,
      height: size,
      color: props.color || theme['color-primary-default'],
    },
  });

  return (
    <TouchableOpacity style={styles.buttonContainer} {...props.wrapperProps}>
      <Icon
        pack={pack}
        name={props.name}
        style={styles.icon}
        {...props.iconProps}
      />
    </TouchableOpacity>
  );
}
