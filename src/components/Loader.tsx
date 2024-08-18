import { StyleSheet, ActivityIndicator } from 'react-native';
import { View } from './Themed';
import Modal from './Modal';
import Spinner from 'react-native-loading-spinner-overlay';

import { useEffect, useState } from 'react';

interface LoaderProps {
  loading: boolean;
}
function Loader({ loading }: LoaderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
      if (loading) setIsLoading(true);
      else setIsLoading(false);
  }, [loading]);

  return (
    <Modal
      modal_only={false}
    >
      <View style={styles.container}>
        <ActivityIndicator
          size='large'
          color='#fff'
        />
      </View>
    </Modal>
  );
}

const LoaderSpinner = ({ loading }: LoaderProps) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={{ color: '#fff' }}
    />
  );
}
export { Loader ,
  LoaderSpinner
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
});
