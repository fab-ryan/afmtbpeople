import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;
const scale = Dimensions.get('window').scale;

export { width, height, fontScale, scale };