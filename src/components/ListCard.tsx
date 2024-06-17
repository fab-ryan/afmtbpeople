import { View, Text } from './Themed';
import { lightTheme } from '@constants/Colors';
import { StyleSheet } from 'react-native';

export const ListView = (props: any) => {
  const validAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'FWR',
  }).format(props?.amount);
  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{props.count}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Source</Text>
        <Text style={styles.columnLabel}>{props?.source}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Amount</Text>
        <Text style={styles.columnLabel}>
          {validAmount}
        </Text>
      </View>
      {/* <View style={styles.columnContainer}>
        <Text style={styles.columnText}>Balance</Text>
        <Text style={styles.columnLabel}>$500</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Success</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingHorizontal: 10,
    paddingVertical: 19,

    borderRadius: 10,
    marginBottom: 20,

    backgroundColor: '#fff',
    shadowColor: lightTheme.text,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.02,
    shadowRadius: 5.27,
    elevation: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

  },
  countText: {
    color: lightTheme.background,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 40,
    height: 40,
    borderRadius: 120 / 2,
    backgroundColor: lightTheme.primary,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginLeft: 20,
  },
  columnText: {
    color: lightTheme.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  columnLabel: {
    color: lightTheme.secondary,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#4A97CE',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  statusText: {
    color: lightTheme.background,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});
