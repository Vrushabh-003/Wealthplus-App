import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-chart-kit';

interface PortfolioData {
  totalInvested: string;
  overallGains: string;
  portfolioXirr: string;
  benchmarkXirr: string;
  potentialEarnings: string;
  analysisSummary: string;
  beta: string;
  rSquared: string;
  sharpeRatio: string;
}

type RootStackParamList = {
  StockPortfolio: undefined;
  Dashboard: undefined;
};

type StockPortfolioProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'StockPortfolio'>;
  route: RouteProp<RootStackParamList, 'StockPortfolio'>;
};

const StockPortfolio: React.FC<StockPortfolioProps> = ({ navigation }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsePercentage = (xirr: string) => {
    return parseFloat(xirr.replace('%', '').replace('+', ''));
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = {
          data: {
            totalInvested: "₹69.5L",
            overallGains: "₹12.8L (18.42%)",
            portfolioXirr: "+18.42%",
            benchmarkXirr: "+16.85%",
            potentialEarnings: "₹3.25L",
            analysisSummary: "Your stock portfolio shows a balanced mix with strong performers leading the growth.",
            beta: "1.82",
            rSquared: "0.76",
            sharpeRatio: "1.2",
          },
        };
        setPortfolioData(response.data);
      } catch (err) {
        setError("Failed to fetch portfolio data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  let greaterValue = 0,
    smallerValue = 0,
    difference = 0,
    greaterLabel = '',
    smallerLabel = '';
  if (portfolioData) {
    const portfolioXirrNum = parsePercentage(portfolioData.portfolioXirr);
    const benchmarkXirrNum = parsePercentage(portfolioData.benchmarkXirr);

    if (portfolioXirrNum >= benchmarkXirrNum) {
      greaterValue = portfolioXirrNum;
      smallerValue = benchmarkXirrNum;
      greaterLabel = "Portfolio XIRR";
      smallerLabel = "Benchmark XIRR";
    } else {
      greaterValue = benchmarkXirrNum;
      smallerValue = portfolioXirrNum;
      greaterLabel = "Benchmark XIRR";
      smallerLabel = "Portfolio XIRR";
    }
    difference = greaterValue - smallerValue;
  }

  const donutData = [
    {
      name: "Doing Good",
      amount: 21.1,
      color: "#28A745",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Keep Monitoring",
      amount: 59.0,
      color: "#F57C00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Low Performing",
      amount: 7.8,
      color: "#DC3545",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logotitle}>WealthPlus</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Stocks</Text>
      </View>

      {portfolioData && (
        <>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Updated as of 21 Dec 24</Text>
            <Text style={styles.cardTitle}>₹82.3L</Text>
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.subTitle}>Total Invested</Text>
                <Text style={styles.cardText}>{portfolioData.totalInvested}</Text>
              </View>
              <View>
                <Text style={styles.subTitle}>Overall Gains</Text>
                <Text style={styles.cardText}>{portfolioData.overallGains}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.headerText}>How did your portfolio perform?</Text>
            <View style={styles.newPerformanceContainer}>
              <View style={styles.leftBlock}>
                <Text style={styles.largerText}>{`${greaterValue.toFixed(2)}%`}</Text>
                <Text style={styles.blockLabel}>{greaterLabel}</Text>
              </View>
              <View style={styles.rightContainer}>
                <View style={styles.topRightBlock}>
                  <Text style={styles.performanceText}>{`+${difference.toFixed(2)}%`}</Text>
                  <Text style={styles.blockLabel}>Difference</Text>
                </View>
                <View style={styles.bottomRightBlock}>
                  <Text style={styles.performanceText}>{`${smallerValue.toFixed(2)}%`}</Text>
                  <Text style={styles.blockLabel}>{smallerLabel}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.cardNote}>
              Your portfolio could have potentially earned {portfolioData.potentialEarnings} more with active investing
            </Text>
          </View>

          <View style={styles.analysisSection}>
            <Text style={styles.headerText}>Stock Analysis</Text>
            <View style={styles.graphContainer}>
              <PieChart
                data={donutData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="84"
                absolute
                hasLegend={false}
              />
              <View style={styles.donutCenter}>
                <Text style={styles.donutCenterText}>Analysis</Text>
              </View>
            </View>

            {/* Legends Container */}
            <View style={styles.legendContainer}>
              {donutData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{`${item.name} (${item.amount}%)`}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.subTitle}>{portfolioData.analysisSummary}</Text>
            <Text style={styles.subTitle}>Consider rebalancing low-performing funds to optimize returns.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Strong performance, with high volatility</Text>
            </View>
            <View style={styles.metricsContainer}>
              <View style={[styles.metricCard, styles.betaCard]}>
                <Text style={styles.metricValue}>{portfolioData.beta}</Text>
                <Text style={styles.metricTitle}>Beta</Text>
                <Text style={styles.metricSubtitle}>Volatility</Text>
              </View>
              <View style={[styles.metricCard, styles.rSquaredCard]}>
                <Text style={styles.metricValue}>{portfolioData.rSquared}</Text>
                <Text style={styles.metricTitle}>R-squared</Text>
                <Text style={styles.metricSubtitle}>Correlation</Text>
              </View>
              <View style={[styles.metricCard, styles.sharpeCard]}>
                <Text style={styles.metricValue}>{portfolioData.sharpeRatio}</Text>
                <Text style={styles.metricTitle}>Sharpe ratio</Text>
                <Text style={styles.metricSubtitle}>Return per risk</Text>
              </View>
            </View>
            <Text style={styles.description}>
              Portfolio shows high returns but with increased market sensitivity
            </Text>
            <Text style={styles.description}>
              Most peer portfolios achieve similar returns with lower risk
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 500,
    flex: 1,
  },
  logotitle: {
    fontSize: 28,
    color: '#3b3b3b',
    marginLeft: 20,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    color: '#3b3b3b',
    marginLeft: 20,
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    color: '#777777',
  },
  cardText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: '600',
  },
  cardNote: {
    fontSize: 16,
    color: '#ee2222',
  },
  performanceText: {
    fontSize: 18,
    color: '#2222ff',
    fontWeight: 'bold',
  },
  blockLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  newPerformanceContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftBlock: {
    flex: 1.5,
    backgroundColor: '#ecfdf5',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRightBlock: {
    backgroundColor: '#fef4e8',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  bottomRightBlock: {
    backgroundColor: '#ecfdf5',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  largerText: {
    fontSize: 24,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  analysisSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  graphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  donutCenter: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingRight: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#7F7F7F',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  metricValue: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  infoIcon: {
    fontSize: 16,
    color: '#666',
  },
  betaCard: {
    backgroundColor: '#ecfdf5',
  },
  rSquaredCard: {
    backgroundColor: '#ecfdf5',
  },
  sharpeCard: {
    backgroundColor: '#ecfdf5',
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default StockPortfolio;