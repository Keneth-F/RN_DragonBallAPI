import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFA500',
  },
});
