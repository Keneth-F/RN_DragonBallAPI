import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Button, Alert } from 'react-native';
import { Character, Planet } from '../types/api';
import { Section } from '../components/Section';
import CharacterList from '../components/CharacterList';
import PlanetList from '../components/PlanetList';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = ({ navigation }: any) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingPlanets, setLoadingPlanets] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCharacterPage, setNextCharacterPage] = useState<string | null>(
    null,
  );
  const [nextPlanetPage, setNextPlanetPage] = useState<string | null>(null);

  const signout = async () => {
    try {
      await AsyncStorage.removeItem('user-session');
      navigation.replace('Login');
    } catch (err: any) {
      console.log({ err });
      Alert.alert('error');
    }
  };
  const fetchData = useCallback(async () => {
    setLoadingCharacters(true);
    setLoadingPlanets(true);
    setError(null);

    try {
      const [charRes, planetRes] = await Promise.all([
        fetch('https://dragonball-api.com/api/characters'),
        fetch('https://dragonball-api.com/api/planets'),
      ]);

      if (!charRes.ok || !planetRes.ok) {
        throw new Error('Error al obtener los datos. Intenta de nuevo.');
      }

      const charData = await charRes.json();
      const planetData = await planetRes.json();

      setCharacters(charData.items || []);
      setPlanets(planetData.items || []);
      setNextCharacterPage(charData.links.next || null);
      setNextPlanetPage(planetData.links.next || null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoadingCharacters(false);
      setLoadingPlanets(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMoreCharacters = async () => {
    if (loadingCharacters || !nextCharacterPage) {
      return;
    }

    try {
      const response = await fetch(nextCharacterPage);
      const newCharData = await response.json();
      setCharacters(prevData => [...prevData, ...newCharData.items]);
      setNextCharacterPage(newCharData.links.next || null);
    } catch (err) {
      console.error('Error loading more characters:', err);
    }
  };

  const loadMorePlanets = async () => {
    if (loadingPlanets || !nextPlanetPage) {
      return;
    }

    try {
      const response = await fetch(nextPlanetPage);
      const newPlanetData = await response.json();
      setPlanets(prevData => [...prevData, ...newPlanetData.items]);
      setNextPlanetPage(newPlanetData.links.next || null);
    } catch (err) {
      console.error('Error loading more planets:', err);
    }
  };

  if (loadingCharacters || loadingPlanets) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="logout" onPress={signout} color={'#FFD700'} />
      <Section title="Personajes">
        <CharacterList
          characters={characters}
          onEndReached={loadMoreCharacters}
        />
      </Section>
      <Section title="Planetas">
        <PlanetList planets={planets} onEndReached={loadMorePlanets} />
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
