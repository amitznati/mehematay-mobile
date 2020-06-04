import React from 'react';
import {Input, Icon, Layout, Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

export const SearchInput = ({onSearch}) => {
  const [value, setValue] = React.useState('');

  const onIconPress = () => {
    value && onSearch && onSearch(value);
  };

  const SearchIcon = style => {
    return <Icon name="magnify" pack="material-community" />;
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonStyle}
        icon={SearchIcon}
        onPress={onIconPress}
        size="large"
      />
      <Input
        style={styles.inputStyle}
        value={value}
        size="large"
        placeholder="חפש מקום"
        onChangeText={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    height: 50,
    borderBottomLeftRadius: 20,
  },
  inputStyle: {
    flex: 11,
    height: 50,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    borderTopRightRadius: 20,
  },
});
export default SearchInput;
