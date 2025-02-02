import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";

const StockPortfolio = () => {
  const totalInvested = "₹69.5L";
  const overallGains = "₹12.8L (18.42%)";
  const portfolioReturns = "+18.42%";
  const niftyReturns = "+16.85%";
  const potentialGains = "₹3.25L more in gains with active trading";

  const stockData = [
    { name: "Doing Good", value: 21, color: "#4CAF50" },
    { name: "Keep Monitoring", value: 15, color: "#FF9800" },
    { name: "Low Performing", value: 7, color: "#F44336" },
  ];

  const chartData = stockData.map((item, index) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* Portfolio Summary */}
      <View style={styles.card}>
        <Text style={styles.heading}>Portfolio Summary</Text>
        <Text style={styles.text}>Total Invested: {totalInvested}</Text>
        <Text style={styles.text}>Overall Gains: {overallGains}</Text>
      </View>

      {/* Performance Section */}
      <View style={styles.performanceCard}>
        <View style={styles.performanceBox}>
          <Text style={styles.performanceText}>{portfolioReturns}</Text>
          <Text style={styles.subText}>Portfolio Returns</Text>
        </View>
        <View style={styles.performanceBoxSecondary}>
          <Text style={styles.performanceText}>{niftyReturns}</Text>
          <Text style={styles.subText}>Nifty 50</Text>
        </View>
      </View>
      <Text style={styles.alertText}>{potentialGains}</Text>

      {/* Stock Analysis */}
      <View style={styles.card}>
        <Text style={styles.heading}>Stock Analysis</Text>
        <PieChart
          data={chartData}
          width={320}
          height={180}
          chartConfig={{ backgroundColor: "#fff", color: () => "#000" }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
        <Text style={styles.subText}>
          Your stock portfolio shows strong potential with key performers driving growth.
        </Text>
      </View>

      {/* Performance Indicators */}
      <View style={styles.card}>
        <Text style={styles.heading}>Risk & Performance</Text>
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorBox}>
            <Text style={styles.performanceText}>1.82</Text>
            <Text style={styles.subText}>Beta (Volatility)</Text>
          </View>
          <View style={styles.indicatorBox}>
            <Text style={styles.performanceText}>0.76</Text>
            <Text style={styles.subText}>R-squared (Correlation)</Text>
          </View>
          <View style={styles.indicatorBox}>
            <Text style={styles.performanceText}>1.2</Text>
            <Text style={styles.subText}>Sharpe Ratio (Return per Risk)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  performanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  performanceBox: {
    flex: 1,
    backgroundColor: "#DFF5E7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  performanceBoxSecondary: {
    flex: 1,
    backgroundColor: "#E3EAFD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  performanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
  },
  alertText: {
    fontSize: 14,
    color: "#FF5733",
    marginBottom: 10,
    textAlign: "center",
  },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  indicatorBox: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
  },
});

export default StockPortfolio;