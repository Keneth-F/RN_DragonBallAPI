import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Planet} from '../types/api';
import CharacterList from '../components/CharacterList';

const PlanetDetailScreen = ({route}: {route: any}) => {
  const {planet} = route.params;
  const [fullPlanet, setFullPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        console.log({planet});
        const response = await fetch(
          `https://dragonball-api.com/api/planets/${planet.id}`,
        );
        if (!response.ok) {
          throw new Error('Error al cargar los datos del planeta');
        }
        const data = await response.json();
        setFullPlanet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetDetails();
  }, [planet]);

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
      </View>
    );
  }

  if (!fullPlanet) {
    return null;
  }
  console.log({fullPlanet});
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{uri: fullPlanet.image}} style={styles.image} />
        <Text style={styles.name}>{fullPlanet.name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>¿Destruido?</Text>
          <Text style={styles.value}>
            {fullPlanet.isDestroyed ? 'Sí' : 'No'}
          </Text>
        </View>

        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Text style={styles.description}>{fullPlanet.description}</Text>

        <Text style={styles.descriptionTitle}>Personajes del planeta:</Text>
        <CharacterList characters={fullPlanet.characters} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    margin: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderWidth: 3,
    borderColor: '#FFD700',
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 90,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD100',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'justify',
    marginTop: 5,
  },
  characterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
  },
  characterText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default PlanetDetailScreen;
