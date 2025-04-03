import {FlatList, TouchableOpacity} from 'react-native';
import CharacterCard from './CharacterCard';
import {Character} from '../types/api';
import {useNavigation} from '@react-navigation/native';
export default function CharacterList({
  characters,
  onEndReached,
}: {
  characters: Character[];
  onEndReached?: () => void;
}) {
  const navigation = useNavigation<any>();
  return (
    <FlatList
      data={characters}
      keyExtractor={item => item.id.toString()}
      horizontal
      onEndReached={onEndReached}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Character', {character: item})}>
          <CharacterCard character={item} />
        </TouchableOpacity>
      )}
    />
  );
}
