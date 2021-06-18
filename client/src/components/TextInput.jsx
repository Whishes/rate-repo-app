import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.mainBackground,
    borderRadius: 4,
  },
  errorMessage: {
    borderColor: theme.error.color
  }
});

const TextInput = ({ error, style, ...props }) => {
  const textInputStyle = [styles.container, error && styles.errorMessage, style];
  return (
    <NativeTextInput style={textInputStyle} {...props} />
  );
};

export default TextInput; 