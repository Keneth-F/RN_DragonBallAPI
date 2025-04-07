import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import CharacterList from '../components/CharacterList';
import PlanetList from '../components/PlanetList';
import { Section } from '../components/Section';
import { Character, Planet } from '../types/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  const searchInputRef = useRef<TextInput | null>(null);

  const fetchData = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const [charRes, planetRes] = await Promise.all([
        fetch(`https://dragonball-api.com/api/characters?name=${searchQuery}`),
        fetch(`https://dragonball-api.com/api/planets?name=${searchQuery}`),
      ]);

      if (!charRes.ok || !planetRes.ok) {
        throw new Error('Error al obtener los datos. Intenta de nuevo.');
      }

      const charData = await charRes.json();
      const planetData = await planetRes.json();
      setCharacters(charData || []);
      setPlanets(planetData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery === '') {
      setCharacters([]);
      setPlanets([]);
      return;
    }

    fetchData(debouncedQuery);
  }, [debouncedQuery, fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearchChange = (text: string) => {
    setQuery(text);
  };

  if (loading) {
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
        <Button title="Reintentar" onPress={() => fetchData(debouncedQuery)} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder="Buscar personajes o planetas"
        value={query}
        onChangeText={handleSearchChange}
      />

      <Section title="Personajes">
        <CharacterList characters={characters} />
      </Section>

      <Section title="Planetas">
        <PlanetList planets={planets} />
      </Section>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchInput: {
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
