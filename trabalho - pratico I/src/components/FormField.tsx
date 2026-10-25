import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#718096"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType="next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, marginBottom: 12 },
  label: { color: '#DCE5EF', fontSize: 13, fontWeight: '700', marginBottom: 9 },
  input: {
    backgroundColor: '#142033',
    borderColor: '#35455B',
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: '#F7FAFC',
    fontSize: 14,
  },
});
