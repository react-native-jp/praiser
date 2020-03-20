import React from 'react';

export default function useControlledComponent<T>(initialValue: T) {
  const [value, setValue] = React.useState(initialValue);

  function onChangeText(newValue: T) {
    setValue(newValue);
  }

  return {
    value,
    onChangeText,
  };
}
