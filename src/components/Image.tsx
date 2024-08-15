import { StyleSheet } from 'react-native';
import { Image as DefaultImages } from 'expo-image';

export type ImageProps = DefaultImages['props'];

export function Image({ style, ...props }: ImageProps) {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <DefaultImages
      style={[styles.image, style]}
      placeholder={props.placeholder ?? blurhash}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
