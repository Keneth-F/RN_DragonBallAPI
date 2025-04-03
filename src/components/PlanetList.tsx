import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import PlanetCard from './PlanetCard';
import {Planet} from '../types/api';
import {useNavigation} from '@react-navigation/native';
export default function PlanetList({
  planets,
  onEndReached,
}: {
  planets: Planet[];
  onEndReached?: () => void;
}) {
  const navigation = useNavigation<any>();
  return (
    <FlatList
      data={planets}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      bounces={true}
      onEndReached={onEndReached}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Planet', {planet: item})}>
          <PlanetCard planet={item} />
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-around',
    flex: 1,
    gap: 4,
  },
});
