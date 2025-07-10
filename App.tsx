import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Button,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import NativeSMSReader from './specs/NativeSMSReader';
import TransactionDB from './specs/NativeTransactionDBSpec';

const App = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  // Fetch all transactions from DB
  const loadTransactionsFromDB = async () => {
    try {
      const txns = await TransactionDB.getAllTransactions();
      console.log(txns);
      setMessages(txns);
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  };

  // Call native getAllSMS and wait for completion
  const handleFetchSMS = async () => {
    setLoading(true);
    setProgress(null);

    try {
      // const result = await NativeSMSReader.getAllSMS(); // triggers native+js parsing and DB insert

      // if (result === true) {
        await loadTransactionsFromDB(); // fetch from SQLite after native flow completes
      // }
    } catch (err) {
      console.error('getAllSMS failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Setup progress listener
  useEffect(() => {
    const emitter = new NativeEventEmitter(NativeModules.NativeSMSReader);
    const subscription = emitter.addListener('SMS_PROGRESS', (progressValue: number) => {
      setProgress(progressValue);
    });

    return () => subscription.remove();
    // TransactionDB.deleteDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.buttonContainer}>
        <Button title="Fetch All SMS" onPress={handleFetchSMS} disabled={loading} />
        {progress !== null && (
          <Text style={styles.progressText}>Progress: {progress}%</Text>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => `${item.sender}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.body}</Text>
              <Text
                style={[
                  styles.amount,
                  { color: item.transaction_type === 'credit' ? 'green' : 'red' },
                ]}
              >
                ₹ {parseFloat(item.amount).toFixed(2)} {item.transaction_type}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fafafa',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default App;
