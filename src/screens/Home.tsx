import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { Search, Plus, UserPen } from 'lucide-react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Colors } from '../utils/Colors';
import TransactionDB from '../../specs/NativeTransactionDBSpec';
import NativeSMSReader from '../../specs/NativeSMSReader';

const HomeScreen = () => {
  const percentage = 119;
  const spent = 59384;
  const income = 71614;
  const budget = 50000;
  const safeToSpend = 0;

  const [animateChart, setAnimateChart] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const formatTransactions = (rawTxns: any[]) => {
    return rawTxns.map((txn) => {
      const parsedAmount = parseFloat(txn.amount);
      const isDebit = txn.body?.toLowerCase().includes('debited');

      return {
        id: txn.id.toString(),
        label: txn.transaction_type?.toUpperCase() || 'Transaction',
        amount: parsedAmount,
        date: formatDisplayDate(txn.date),
        iconColor: isDebit ? '#FF3B3B' : '#00C897',
        icon: txn.transaction_type?.[0]?.toUpperCase() || '₹',
      };
    });
  };

  const formatDisplayDate = (dateStr: string) => {
    try {
      const [d, m, yTime] = dateStr.split('-');
      const [y, time] = yTime.split(' ');
      const date = new Date(`20${y}-${m}-${d}T${time}`);
      const options = { day: '2-digit', month: 'short' } as const;
      return date.toLocaleDateString('en-GB', options);
    } catch (err) {
      return dateStr;
    }
  };

  const loadTransactionsFromDB = async () => {
    try {
      const txns = await TransactionDB.getAllTransactions();
      setMessages(txns);
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  };

  const handleFetchSMS = async () => {
    setLoading(true);
    setProgress(null);

    try {
      // const result = await NativeSMSReader.getAllSMS();
      // if (result === true) {
        await loadTransactionsFromDB();
      // }
    } catch (err) {
      console.error('getAllSMS failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchSMS();
    const timeout = setTimeout(() => setAnimateChart(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <UserPen size={18} color={Colors.gray} />
          </View>
          <Text style={styles.greeting}>
            Hi <Text style={styles.name}>Mohan</Text>
          </Text>
          <Search size={20} color="#000" />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.subText}>
          Spent in <Text style={{ fontWeight: 'bold' }}>July</Text>
        </Text>

        <View style={styles.chartContainer}>
          {animateChart && (
            <PieChart
              donut
              radius={80}
              innerRadius={70}
              isAnimated
              animationDuration={800}
              showText={false}
              focusOnPress
              centerLabelComponent={() => (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#888' }}>Remaining</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7F3DFF' }}>
                    ₹{income - spent}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#aaa' }}>of ₹{income}</Text>
                </View>
              )}
              data={[
                {
                  value: spent,
                  color: '#FF6B6B',
                  gradientCenterColor: '#FF3B3B',
                },
                {
                  value: income - spent,
                  color: '#00C897',
                  gradientCenterColor: '#00E676',
                },
              ]}
            />
          )}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Income{"\n"}
            <Text style={styles.statsValue}>₹{income.toLocaleString()}</Text>
          </Text>
          <Text style={styles.statsText}>
            Budget{"\n"}
            <Text style={styles.statsValue}>₹{budget.toLocaleString()}</Text>
          </Text>
          <Text style={styles.statsText}>
            Safe to spend{"\n"}
            <Text style={styles.statsValue}>₹{safeToSpend}/day</Text>
          </Text>
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent transactions</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addText}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={formatTransactions(messages)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <View
                  style={[styles.transactionIcon, { backgroundColor: item.iconColor }]}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionLabel}>{item.label}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.transactionAmount}>₹{item.amount}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1FA' },
  headerWrapper: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
  },
  name: { fontWeight: 'bold' },
  content: { flex: 1, backgroundColor: '#fff' },
  subText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statsText: {
    textAlign: 'center',
    color: '#777',
  },
  statsValue: {
    color: '#000',
    fontWeight: '600',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  transactionsContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    borderColor: '#eee',
    borderWidth: 1,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  transactionLabel: {
    color: '#000',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#000',
    fontWeight: 'bold',
  },
  transactionDate: {
    color: '#999',
    fontSize: 12,
  },
});

export default HomeScreen;
