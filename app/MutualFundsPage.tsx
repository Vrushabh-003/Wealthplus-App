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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PieChart from 'react-native-pie-chart'


// interface PortfolioData {
//   totalInvested: string;
//   overallGains: string;
//   portfolioXirr: string;
//   benchmarkXirr: string;
//   potentialEarnings: string;
//   analysisSummary: string;
//   beta: string;
//   rSquared: string;
//   sharpeRatio: string;
// }

// type RootStackParamList = {
//   MutualFundsPage: undefined;
// };

const MutualFundsPage: React.FC = () => {
  // const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [Portfoliohealth, setPortfolioHealth] = useState<any>(null);
  const [Portfoliodetails, setPortfolioDetails] = useState<any>(null);
  const [Portfolioheader, setPortfolioHeader] = useState<any>(null);
  const [PortfolioXirrAnalysis, setPortfolioXirrAnalysis] = useState<any>(null);
  const fetchData = async () => {
    try {

      const portfolioHeader=fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHeader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reqId: '15043487',
          mobile: '+919940615334',
          type: 'mutual_funds',
        }),
      })

      const portfolioXirrAnalysis = await AsyncStorage.getItem('MFPortfolioXirrAnalysis');
      const portfolioDetails = await AsyncStorage.getItem('MFPortfoliodetails');
      const portfolioHealth = await AsyncStorage.getItem('MFPortfoliohealth');
  
      console.log("Data from AsyncStorage:");
      console.log("MFPortfolioXirrAnalysis:", portfolioXirrAnalysis);
      console.log("MFPortfolioheader:", portfolioHeader);
      console.log("MFPortfoliodetails:", portfolioDetails);
      console.log("MFPortfoliohealth:", portfolioHealth);
  
      setPortfolioXirrAnalysis(portfolioXirrAnalysis ? JSON.parse(portfolioXirrAnalysis) : {});
      // setPortfolioHeader(portfolioHeader ? JSON.parse(portfolioHeader) : {});
      setPortfolioDetails(portfolioDetails ? JSON.parse(portfolioDetails) : {});
      setPortfolioHealth(portfolioHealth ? JSON.parse(portfolioHealth) : {});
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };
  
  
  useEffect(() => {
    fetchData();
  }, []);
  







  // Donut chart data (similar to StockPortfolio)
  

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  // const parsePercentage = (xirr: string) => {
  //   return parseFloat(xirr.replace('%', '').replace('+', ''));
  // };

  // useEffect(() => {
  //   const fetchPortfolioData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       // Simulate API response with dummy data
  //       const response = {
  //         data: {
  //           potentialEarnings: "₹5.47L",
  //           analysisSummary: "Your portfolio shows a balanced mix with strong performers leading the growth.",
  //           beta: "1.82",
  //           rSquared: "0.76",
  //           sharpeRatio: "1.2",
  //         },
  //       };
  //       setPortfolioData(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch portfolio data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPortfolioData();
  // }, []);

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


      useEffect(() => {
          const fetchPortfolioStatus = async () => {
            try {
              const response = await fetch('http://api.inwealthera.com/api/api/portfolio/getPortfolioXirrAnalysis', {
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
              setPortfolioXirrAnalysis(data);
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


  if (PortfolioXirrAnalysis) {
    const portfolioXirrNum = Number(PortfolioXirrAnalysis.portfolioXirr);
    const benchmarkXirrNum = Number(PortfolioXirrAnalysis.benchmarkXirr);

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

  const isPortfolioXirrGreaterThanBenchmark =
  PortfolioXirrAnalysis && Number(PortfolioXirrAnalysis.portfolioXirr) > Number(PortfolioXirrAnalysis.benchmarkXirr);

const isBenchmarkXirrGreaterThanPortfolio =
  PortfolioXirrAnalysis && Number(PortfolioXirrAnalysis.benchmarkXirr) > Number(PortfolioXirrAnalysis.portfolioXirr);

if (loading || !Portfoliodetails || !Portfolioheader || !Portfoliohealth ) {
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

  

  const chartSize = 150; // Define the size of the chart
  const radius = chartSize / 2; // Calculate the radius of the pie chart

  // const donutData = [
  //   {
  //     name: "Buy",
  //     amount: 100,
  //     color: "#28A745",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 12,
  //   },
  //   {
  //     name: "Hold",
  //     amount: 700,
  //     color: "#F57C00",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 12,
  //   },
  //   {
  //     name: "Sell",
  //     amount: 150,
  //     color: "#DC3545",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 12,
  //   },
  // ];

  const donutData = [
    {
      name: "Buy\n₹"+formatNumber(Portfoliohealth?.Buy?.currentMktValue)+" ("+Portfoliohealth?.Buy?.fundCount+' funds)',
      amount: Number(Portfoliohealth?.Buy?.currentMktValue),
      color: "#28A745",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Hold\n₹"+formatNumber(Portfoliohealth?.Hold?.currentMktValue)+"\n("+Portfoliohealth?.Hold?.fundCount+' funds)',
      amount: Number(Portfoliohealth?.Hold?.currentMktValue),
      color: "#F57C00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Sell\n₹"+formatNumber(Portfoliohealth?.Sell?.currentMktValue)+"\n("+Portfoliohealth?.Sell?.fundCount+' funds)',
      amount: Number(Portfoliohealth?.Sell?.currentMktValue),
      color: "#DC3545",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  //, label: { text: "SELL", offsetY: 20, offsetX: 20, fontSize: 16, fontStyle: 'italic', outline: 'white'}},
  

  const series = [
    { value: Number(Portfoliohealth?.Buy?.currentMktValue), color: '#28A745'  },
    { value: Number(Portfoliohealth?.Hold?.currentMktValue), color: '#F57C00' },
    { value: Number(Portfoliohealth?.Sell?.currentMktValue), color: '#DC3545'}
  ] 

  // const series = [
  //   { value: 100, color: '#28A745'  },
  //   { value: 700, color: '#F57C00' },
  //   { value: 150, color: '#DC3545'}
  // ] 
  const totalAmount = donutData.reduce((sum, item) => sum + item.amount, 0);

  // Function to calculate position for label based on angle
  // const getLabelPosition = (angle : any, radius: any) => {
  //   const radians = (angle - 90) * (Math.PI / 180); // Convert angle to radians
  //   const x = radius * Math.cos(radians); // X coordinate
  //   const y = radius * Math.sin(radians); // Y coordinate
  //   return { x, y };
  // };

  // // Function to ensure the label stays within the bounds of the screen
  // const clampPosition = (x: any, y: any, radius: any) => {
  //   // Clamp x and y position to avoid exceeding the screen size
  //   const clampedX = Math.min(Math.max(x, -radius), radius);
  //   const clampedY = Math.min(Math.max(y, -radius), radius);
  //   return { clampedX, clampedY };
  // };

  const mfdiff=(difference/100)*Portfolioheader.currentMktValue

 
 


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Wealthplus</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Mutual Funds</Text>
      </View>

      {Portfoliodetails && Portfolioheader && Portfoliohealth && (
        <>
          {/* Investment Summary */}
          <View style={styles.card}>
            <Text style={styles.subTitle}>Updated as of {Portfolioheader.navDate}</Text>
            <Text style={styles.subTitle}>Current Value</Text>
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

  {isPortfolioXirrGreaterThanBenchmark  && (
      <View style={styles.newPerformanceContainer}>
      {/* Left Block (Portfolio or Benchmark XIRR) */}
      <View style={styles.leftBlock}>
        <Text style={styles.largerText}>
          {`+${(
            isPortfolioXirrGreaterThanBenchmark
              ? PortfolioXirrAnalysis.portfolioXirr
              : PortfolioXirrAnalysis.benchmarkXirr
          ).toFixed(2)}%`}
        </Text>
        <Text style={styles.blockLabel}>
          {isPortfolioXirrGreaterThanBenchmark ? 'Portfolio XIRR' : 'Benchmark XIRR'}
        </Text>
      </View>
  
      {/* Right Container (Difference, Portfolio XIRR, Benchmark XIRR) */}
      <View style={styles.rightContainer}>
        {/* Difference Container */}
        <View
          style={[
            styles.topRightBlockp,
            {
              height: Math.max(
                40,
                (difference / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`+${difference.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Difference</Text>
        </View>
  
        {/* Portfolio XIRR Container */}
        <View
          style={[
            styles.bottomRightBlock,
            {
              height: Math.max(
                40,
                (PortfolioXirrAnalysis.portfolioXirr / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`${PortfolioXirrAnalysis.portfolioXirr.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Portfolio XIRR</Text>
        </View>
  
        {/* Benchmark XIRR Container */}
        {/* <View
          style={[
            styles.bottomRightBlock,
            {
              height: Math.max(
                30,
                (PortfolioXirrAnalysis.benchmarkXirr / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`${PortfolioXirrAnalysis.benchmarkXirr.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Benchmark XIRR</Text>
        </View> */}
        
      </View>
      
    </View>
    ) }
    {isBenchmarkXirrGreaterThanPortfolio  && (
      <View style={styles.newPerformanceContainer}>

        
      
  
      {/* Right Container (Difference, Portfolio XIRR, Benchmark XIRR) */}
      <View style={styles.rightContainer}>
        {/* Difference Container */}
        <View
          style={[
            styles.topRightBlockn,
            {
              height: Math.max(
                40,
                (difference / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`+${difference.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Difference</Text>
        </View>
  
        {/* Portfolio XIRR Container */}
        <View
          style={[
            styles.bottomRightBlock,
            {
              height: Math.max(
                40,
                (PortfolioXirrAnalysis.portfolioXirr / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`${PortfolioXirrAnalysis.portfolioXirr.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Portfolio XIRR</Text>
        </View>
        
  
        {/* Benchmark XIRR Container */}
        {/* <View
          style={[
            styles.bottomRightBlock,
            {
              height: Math.max(
                30,
                (PortfolioXirrAnalysis.benchmarkXirr / Math.max(PortfolioXirrAnalysis.portfolioXirr, PortfolioXirrAnalysis.benchmarkXirr)) * 100
              ),
            },
          ]}
        >
          <Text style={styles.performanceText}>{`${PortfolioXirrAnalysis.benchmarkXirr.toFixed(2)}%`}</Text>
          <Text style={styles.blockLabel}>Benchmark XIRR</Text>
        </View> */}
        
      </View>

      {/* Left Block (Portfolio or Benchmark XIRR) */}
      <View style={styles.leftBlock}>
        <Text style={styles.largerText}>
          {`+${(
            isPortfolioXirrGreaterThanBenchmark
              ? PortfolioXirrAnalysis.portfolioXirr
              : PortfolioXirrAnalysis.benchmarkXirr
          ).toFixed(2)}%`}
        </Text>
        <Text style={styles.blockLabel}>
          {isPortfolioXirrGreaterThanBenchmark ? 'Portfolio XIRR' : 'Benchmark XIRR'}
        </Text>
      </View>
      
    </View>
    ) }
  {isBenchmarkXirrGreaterThanPortfolio && (
    <Text style={styles.negativecardNote}>
    Your portfolio could have potentially earned more ₹{formatNumber(String(mfdiff))} with active investing
  </Text> 
  )}
  {isPortfolioXirrGreaterThanBenchmark && (
    <Text style={styles.positivecardNote}>
    Your portfolio have earned ₹{formatNumber(String(mfdiff))} more than Benchmark XIRR
  </Text> 
  )}
  
</View>





<View style={styles.analysisSection}>
<TouchableOpacity onPress={() => navigation.navigate('DetailedAnalysis')}>
  <Text style={styles.headerText}>Mutual Fund Analysis</Text>
    <View style={styles.graphContainer}>
      <PieChart
        series={series}
        widthAndHeight={170}
        cover={0.65}
      />
    </View>
  

  {/* Labels near PieChart Sections */}
  <View style={styles.labelContainer}>
    {donutData.map((item, index) => {
      // Calculate the cumulative percentage for the current item
      const totalAmount = donutData.reduce((sum, data) => sum + data.amount, 0);
      const cumulativePercentage = donutData
        .slice(0, index + 1)
        .reduce((sum, data) => sum + (data.amount / totalAmount), 0);

      // Calculate the midpoint angle for the current section
      const midAngle = cumulativePercentage * 360 - (item.amount / totalAmount / 2) * 360;

      // Convert the angle to radians
      const radians = (midAngle - 90) * (Math.PI / 180);

      // Calculate the x and y coordinates for the label
      const radius = 175; // Half of widthAndHeight (250 / 2)
      const labelDistance = radius * 0.62; // Distance from the center for the label
      const x = labelDistance * Math.cos(radians);
      const y = labelDistance * Math.sin(radians);

      // Adjust the label position relative to the pie chart's center
      const centerX = 90; // Half of widthAndHeight (250 / 2)
      const centerY = 90; // Half of widthAndHeight (250 / 2)
      const topPosition = centerY + y; // Adjust for text height
      const leftPosition = centerX + x-5; // Adjust for text width

      if (item.amount==0){
        return null;
      }

      return (
        <Text
          key={index}
          style={[
            styles.pieLabel,
            {
              position: 'absolute',
              top: topPosition,
              left: leftPosition,
              color: item.color,
            },
          ]}
        >
          {item.name}
        </Text>
      );
    })}
  </View>
  </TouchableOpacity>

  <Text style={styles.subTitle}>Consider rebalancing low-performing funds to optimize returns.</Text>
</View>
          {/* Metrics Section */}
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Strong performance, with high volatility</Text>
            </View>
            <View style={styles.metricsContainer}>
              <View style={[styles.metricCard, styles.betaCard]}>
                <Text style={styles.metricValue}>{Portfoliodetails.beta}</Text>
                <Text style={styles.metricTitle}>Beta</Text>
                <Text style={styles.metricSubtitle}>Volatility</Text>
              </View>
              <View style={[styles.metricCard, styles.rSquaredCard]}>
                <Text style={styles.metricValue}>{Portfoliodetails.rSquared}</Text>
                <Text style={styles.metricTitle}>R-squared</Text>
                <Text style={styles.metricSubtitle}>Correlation</Text>
              </View>
              <View style={[styles.metricCard, styles.sharpeCard]}>
                <Text style={styles.metricValue}>{Portfoliodetails.sharpeRatio}</Text>
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
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7D4CED",
    textAlign: "center",
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
  negativecardNote: {
    fontSize: 16,
    color: '#ee2222',
  },
  positivecardNote: {
    fontSize: 16,
    color: '#22ee22',
  },
  // Performance Section styles (matching StockPortfolio)
  newPerformanceContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftBlock: {
    flex: 1.5,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin:2
  },
  topRightBlockp: {
    backgroundColor: '#22ff2266',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  topRightBlockn: {
    backgroundColor: '#E3071D27',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  bottomRightBlock: {
    backgroundColor: '#ecfdf5',
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
  labelContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    width: 250,
    height: 250,
  },
  pieLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // touchableArea: {
  //   marginTop: 5,
  //   backgroundColor: '#007bff',
  //   padding: 8,
  //   borderRadius: 5,
  // },
  // touchableText: {
  //   color: '#fff',
  //   fontSize: 14,
  //   fontWeight: 'bold',
  // },
});

export default MutualFundsPage;
