import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PlanetCard from '../components/PlanetCard';
import {Character} from '../types/api';
import TransformationList from '../components/CharacterList copy';

export default function CharacterDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {character} = route.params;
  const [fullCharacter, setFullCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${character.id}`,
        );
        if (!response.ok) {
          throw new Error('Error fetching character details');
        }
        const data = await response.json();
        setFullCharacter(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [character]);

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

  if (!fullCharacter) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>No se pudo cargar la información.</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {fullCharacter.transformations &&
        fullCharacter.transformations.length ? (
          <TransformationList transformations={fullCharacter.transformations} />
        ) : (
          <Image source={{uri: fullCharacter.image}} style={styles.image} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Raza:</Text>
          <Text style={styles.value}>{fullCharacter.race}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Ki:</Text>
          <Text style={styles.value}>
            {fullCharacter.ki} / {fullCharacter.maxKi}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Afiliación:</Text>
          <Text style={styles.value}>
            {fullCharacter.affiliation || 'Desconocida'}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Planeta de origen:</Text>
          {fullCharacter.originPlanet ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Planet', {
                  planet: fullCharacter.originPlanet,
                })
              }>
              <PlanetCard planet={fullCharacter.originPlanet} />
            </TouchableOpacity>
          ) : (
            <Text style={styles.value}>Desconocido</Text>
          )}
        </View>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.description}>{fullCharacter.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    resizeMode: 'contain',
    borderColor: '#FFD700',
    marginBottom: 10,
    borderRadius: 90,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(12, 11, 11, 0.97)',
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
});
