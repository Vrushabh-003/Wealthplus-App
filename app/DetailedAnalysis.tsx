import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Stock {
  name: string;
  xirr: number;
  description: string;
}

interface PortfolioData {
  Buy: Stock[];
  Hold: Stock[];
  Sell: Stock[];
}

const DetailedAnalysis = () => {
  const navigation = useNavigation();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Verify if the URL is correct.
        const response = await fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHealthDetailed');
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007F00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Stock Recommendations</Text>
      </View>

      <View style={styles.sectionGood}>
        <Text style={styles.sectionTitleGood}>BUY</Text>
        <Text style={styles.sectionSubtitle}>Consider increasing position in these stocks</Text>
        {portfolioData?.Buy?.map((stock, index) => (
          <View key={index} style={styles.cardGood}>
            <Text style={styles.stockTitle}>{stock.name}</Text>
            <Text style={styles.stockDetail}>
              Stock XIRR: <Text style={styles.positiveText}>{stock.xirr}%</Text>
            </Text>
            <Text style={styles.description}>{stock.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionMonitor}>
        <Text style={styles.sectionTitleMonitor}>HOLD</Text>
        <Text style={styles.sectionSubtitle}>Keep these positions under observation</Text>
        {portfolioData?.Hold?.map((stock, index) => (
          <View key={index} style={styles.cardMonitor}>
            <Text style={styles.stockTitle}>{stock.name}</Text>
            <Text style={styles.stockDetail}>
              Stock XIRR: <Text style={styles.warningText}>{stock.xirr}%</Text>
            </Text>
            <Text style={styles.description}>{stock.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionLow}>
        <Text style={styles.sectionTitleLow}>SELL</Text>
        <Text style={styles.sectionSubtitle}>These stocks require immediate review</Text>
        {portfolioData?.Sell?.map((stock: any, index: number) => (
          <View key={index} style={styles.cardLow}>
            <Text style={styles.stockTitle}>{stock.name}</Text>
            <Text style={styles.stockDetail}>
              Stock XIRR: <Text style={styles.negativeText}>{stock.xirr}%</Text>
            </Text>
            <Text style={styles.description}>{stock.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  sectionGood: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3D8E41', // Corrected to uppercase for consistency
  },
  sectionTitleGood: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007F00',
  },
  sectionMonitor: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FA740C'
  },
  sectionTitleMonitor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D97706',
  },
  sectionLow: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CE524F',
  },
  sectionTitleLow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  cardGood: {
    backgroundColor: '#f0fff0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardMonitor: {
    backgroundColor: '#fffaf0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardLow: {
    backgroundColor: '#fff0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  stockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  stockDetail: {
    fontSize: 14,
    marginTop: 4,
  },
  positiveText: {
    color: '#007F00',
  },
  warningText: {
    color: '#D97706',
  },
  negativeText: {
    color: '#D32F2F',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default DetailedAnalysis;
