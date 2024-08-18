import { LoaderSpinner } from '@components';

import { View } from '@components';
import { RootStackScreenProps } from '@utils';
import { useState, useEffect } from 'react';

export default function LoadingScreen({
  navigation,
  route,
}: RootStackScreenProps<'LoadingScreen'>): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoaderSpinner loading={isLoading} />
    </View>
  );
}
