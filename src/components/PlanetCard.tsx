import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Planet} from '../types/api';

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({planet}: PlanetCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{uri: planet.image}} style={styles.image} />
      <View>
        <Text style={styles.name}>{planet.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 160,
    height: 200,
  },
  image: {
    height: 100,
    width: 100,
    objectFit: 'cover',
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFD700',
  },
  detail: {
    fontSize: 16,
    textAlign: 'center',
  },
  stats: {
    marginTop: 10,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
