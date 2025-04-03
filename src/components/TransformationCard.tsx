import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Transformation} from '../types/api';

interface TransformationCardProps {
  transformation: Transformation;
}

export default function TtansformationCard({
  transformation,
}: TransformationCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{uri: transformation.image}} style={styles.image} />
      <View>
        <Text style={styles.name} numberOfLines={2}>
          {transformation.name} : {transformation.ki}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    margin: 5,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 370,
    borderWidth: 3,
    resizeMode: 'contain',
    borderColor: '#FFD700',
    marginBottom: 10,
  },
  image: {
    height: 180,
    width: '100%',
    objectFit: 'contain',
    borderRadius: 50,
  },
});
