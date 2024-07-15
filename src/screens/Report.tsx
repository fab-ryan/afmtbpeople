import { View, Text, LayoutView, HeaderText } from '@components/Themed';
import { lightTheme } from '@constants/Colors';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BKLogo from '@assets/bk_logo.png';
import { TransactionListView } from '@components/ListCard';
import { BarChart } from 'react-native-chart-kit';

export default function Report(): JSX.Element {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: lightTheme.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: lightTheme.background,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
    yAxisSuffix: '$',

  };

  return (
    <LayoutView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HeaderText style={{ textAlign: 'center' }}>Reports</HeaderText>
          <View style={{ marginTop: 20 }} />
          <Image
            source={BKLogo}
            style={{ width: '100%', height: 100, resizeMode: 'contain' }}
          />
          <ScrollView
            style={{
              marginBottom: 20,
              height: '100%',
              padding: 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Welcome to BK
              </Text>
              <Text style={{ fontSize: 16 }}>Your financial partner</Text>
            </View>
            <View style={styles.reportContainer}>
              <TransactionListView
                count={1}
                source='Salary'
                amount={1000}
              />
              <TransactionListView
                count={1}
                source='Salary'
                amount={1000}
              />
              <TransactionListView
                count={1}
                source='Salary'
                amount={1000}
              />

              <View style={styles.chartContainer}>
                <BarChart
                  style={styles.graphStyle}
                  data={data}
                  width={350}
                  height={220}
                  yAxisLabel='$'
                  yAxisSuffix='k'
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    flex: 1,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: lightTheme.tint,
  },

  reportContainer: {
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: lightTheme.background,
  },

  graphStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  chartContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: lightTheme.background,
    padding: 5,
    shadowColor: lightTheme.text,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1.02,
    shadowRadius: 5.27,
    elevation: 10,
    marginBottom: 50,
    

  },
});
