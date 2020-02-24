import React from 'react';
import {Input, Icon} from '@ui-kitten/components';

export const SearchLocationInput = () => {
  const [value, setValue] = React.useState('');

  const onIconPress = () => {
    console.log(value);
  };

  const renderIcon = style => {
    return <Icon {...style} name="magnify" pack="material-community" />;
  };

  return (
    <Input
      value={value}
      placeholder="חפש מקום"
      icon={renderIcon}
      onIconPress={onIconPress}
      onChangeText={setValue}
    />
  );
};

export default SearchLocationInput;
