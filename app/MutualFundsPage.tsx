import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RootStackParamList} from './index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
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

// type RootStackParamList = {
//   MutualFundsPage: undefined;
// };

const MutualFundsPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Donut chart data (similar to StockPortfolio)
  

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  const parsePercentage = (xirr: string) => {
    return parseFloat(xirr.replace('%', '').replace('+', ''));
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API response with dummy data
        const response = {
          data: {
            totalInvested: "₹1.2Cr",
            overallGains: "₹28.4L (23.67%)",
            portfolioXirr: "+15.21%",
            benchmarkXirr: "+19.55%",
            potentialEarnings: "₹5.47L",
            analysisSummary: "Your portfolio shows a balanced mix with strong performers leading the growth.",
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

  const [Portfoliohealth, setPortfolioHealth] = useState<any>(null);
  useEffect(() => {
      const fetchPortfolioStatus = async () => {
        try {
          const response = await fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHealth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          });
          const data = await response.json();
          setPortfolioHealth(data);
          console.log('Portfolio status:', data);
        } catch (error) {
          console.error('Error fetching portfolio status:', error);
        }
      };
  
      fetchPortfolioStatus();
    }, []);


  const [Portfolioheader, setPortfolioHeader] = useState<any>(null);
  useEffect(() => {
      const fetchPortfolioStatus = async () => {
        try {
          const response = await fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHeader', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          });
          const data = await response.json();
          setPortfolioHeader(data);
          console.log('Portfolio status:', data);
        } catch (error) {
          console.error('Error fetching portfolio status:', error);
        }
      };
  
      fetchPortfolioStatus();
    }, []);

    const [Portfoliodetails, setPortfolioDetails] = useState<any>(null);
    useEffect(() => {
        const fetchPortfolioStatus = async () => {
          try {
            const response = await fetch('http://api.inwealthera.com/api/portfolio/getPortfolioDetails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                reqId: '15043487',
                mobile: '+919940615334',
                type: 'mutual_funds',
              }),
            });
            const data = await response.json();
            setPortfolioDetails(data);
            console.log('Portfolio status:', data);
          } catch (error) {
            console.error('Error fetching portfolio status:', error);
          }
        };
    
        fetchPortfolioStatus();
      }, []);

  // Calculate performance details similar to StockPortfolio
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

if (loading || !portfolioData || !Portfoliodetails || !Portfolioheader || !Portfoliohealth ) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#aaaaaa" />
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

  // Function to format numbers into 1K, 1L, 1Cr, etc.
  const formatNumber = (num: string) => {
    const number = parseFloat(num);  // Convert the string to a number
  
    if (isNaN(number)) return "Invalid value"; // Return if it's not a valid number
  
    if (number >= 10000000) {
      // For Crores (10 million and above)
      return (number / 10000000).toFixed(2) + 'Cr'; // Keeping 2 decimals for Cr
    } else if (number >= 100000) {
      // For Lakhs (100 thousand and above)
      return (number / 100000).toFixed(2) + 'L'; // Keeping 2 decimals for L
    } else if (number >= 1000) {
      // For Thousands
      return (number / 1000).toFixed(2) + 'K'; // Keeping 2 decimals for K
    } else {
      return number.toString(); // For smaller numbers
    }
  };

  const donutData = [
    {
      name: "Buy",
      amount: Number(Portfoliohealth?.Buy?.currentMktValue),
      color: "#28A745",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Hold",
      amount: Number(Portfoliohealth?.Hold?.currentMktValue),
      color: "#F57C00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Sell",
      amount: Number(Portfoliohealth?.Sell?.currentMktValue),
      color: "#DC3545",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];
  
  const totalAmount = donutData.reduce((sum, item) => sum + item.amount, 0);

 


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logotitle}>WealthPlus</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Mutual Funds</Text>
      </View>

      {portfolioData && Portfoliodetails && Portfolioheader && Portfoliohealth && (
        <>
          {/* Investment Summary */}
          <View style={styles.card}>
            <Text style={styles.subTitle}>Updated as of {Portfolioheader.navDate}</Text>
            <Text style={styles.cardTitle}>₹{formatNumber(Portfolioheader.currentMktValue)}</Text>
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.subTitle}>Total Invested</Text>
                <Text style={styles.cardText}>₹{formatNumber(Portfolioheader.costValue)}</Text>
              </View>
              <View>
                <Text style={styles.subTitle}>Overall Gains</Text>
                <Text style={styles.cardText}>₹{(formatNumber(Portfolioheader.gainLoss))+" ("+(Portfolioheader.gainLossPercentage)+")%"}</Text>
              </View>
            </View>
          </View>

          {/* Performance Section (Updated to match StockPortfolio) */}
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

          {/* Analysis Section (Updated to match StockPortfolio) */}
          <View style={styles.analysisSection}>
            <Text style={styles.headerText}>Mutual Fund Analysis</Text>
            <View style={styles.graphContainer}>
              <PieChart
                data={donutData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="90"
                absolute
                hasLegend={false}
              />
              <View style={styles.donutCenter}>
                <Text style={styles.donutCenterText}>Analysis</Text>
              </View>
            </View>

            {/* Legends */}
            <View style={styles.legendContainer}>
            {donutData.map((item, index) => {
              const percentage = totalAmount > 0 ? ((item.amount / totalAmount) * 100).toFixed(2) : "0.00";

              return (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{`${item.name} (${percentage}%)`}</Text>
                </View>
              );
            })}
          </View>

            <Text style={styles.subTitle}>{portfolioData.analysisSummary}</Text>
            <Text style={styles.subTitle}>Consider rebalancing low-performing funds to optimize returns.</Text>
          </View>

          {/* Metrics Section */}
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
    color: '#777777',
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
  // Performance Section styles (matching StockPortfolio)
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
  performanceText: {
    fontSize: 16,
    color: '#2222ff',
    fontWeight: 'bold',
  },
  blockLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  // Analysis Section styles (matching StockPortfolio)
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
  // Metrics Section styles (reuse from MutualFundsPage)
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
  metricTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
});

export default MutualFundsPage;
