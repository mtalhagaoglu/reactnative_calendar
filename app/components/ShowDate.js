import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

export default function ShowDate({title, date, onPress, isSelected}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected && {borderWidth: 1}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date || '--'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 12,
    color: 'gray',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
