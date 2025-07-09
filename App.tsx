import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import NativeSMSReader, { SMS } from './specs/NativeSMSReader';
import TransactionDB from './specs/NativeTransactionDBSpec';
import smsRules from './src/data/banksJson';
import { TxnMsg } from './src/types/types';
import { parseSms } from './src/utils/parserLogic';

const App = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const formatTxnToDB = (msg: TxnMsg) => ({
    address: msg.address,
    body: msg.body,
    amount: msg.extracted?.amount || '',
    date: msg.extracted?.date || '',
    type: msg.type || '',
    pan: msg.extracted?.pan || '',
    networkReferenceId: msg.extracted?.network_reference_id || '',
    accountBalance: msg.extracted?.account_balance || '',
  });

  const fetchMessages = async () => {
    try {
      const dbTxns = await TransactionDB.getAllTransactions();
      if (dbTxns.length > 0) {
        setMessages(dbTxns.map(txn => ({
          ...txn,
          body: txn.body,
          address: txn.address,
          amount: parseFloat(txn.amount),
          type: txn.type,
          extracted: {
            amount: txn.amount,
            date: txn.date,
            pan: txn.pan,
            network_reference_id: txn.network_reference_id,
            account_balance: txn.account_balance,
            transaction_type: txn.type,
          }
        })));
        return;
      }

      const allSMS: SMS[] = await NativeSMSReader.getAllSMS();
      const parsed: TxnMsg[] = [];

      for (const msg of allSMS) {
        const sender = msg.address?.split('-')[1];
        const result = parseSms(smsRules, { ...msg, sender });

        if (result && result.extracted?.amount) {
          parsed.push({
            ...msg,
            amount: parseFloat(result.extracted.amount),
            type: result.sms_type,
            extracted: result.extracted,
          });
        }
      }

      if (parsed.length > 0) {
        const formatted = parsed.map(formatTxnToDB);
        await TransactionDB.insertTransactionsList(formatted);
      }

      setMessages(parsed);
    } catch (e) {
      console.error('Error fetching messages:', e);
    }
  };

  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => `${item.address}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.body}</Text>
            <Text
              style={[
                styles.amount,
                { color: item.type === 'credit' ? 'green' : 'red' },
              ]}
            >
              ₹ {item.amount?.toFixed(2)} {item.extracted?.transaction_type}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
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
});

export default App;
