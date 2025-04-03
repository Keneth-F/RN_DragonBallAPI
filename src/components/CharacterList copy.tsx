import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import TransformationCard from './TransformationCard';
import {Transformation} from '../types/api';

export default function TransformationList({
  transformations,
}: {
  transformations: Transformation[];
}) {
  return (
    <FlatList
      data={transformations}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={400}
      snapToAlignment="center"
      decelerationRate="fast"
      renderItem={({item}) => (
        <View style={styles.cardContainer}>
          <TransformationCard transformation={item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
  },
});
