import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import NativeSMSReader, { SMS } from './specs/NativeSMSReader';
import smsRules from './src/data/banksJson';

type TxnMsg = SMS & {
  amount?: number;
  type?: 'credit' | 'debit';
};

function parseSms(config: any, sms: SMS & { sender: string }) {
  const blacklistRegex =
    /\b(password|otp|verification|activation|passcode|osp|netsecure)\b/i;
  if (blacklistRegex.test(sms.body)) {
    return null;
  }
  const possibleSenders = [sms.sender].filter(Boolean);
  for (const rule of config.rules) {
    const senders = rule.senders || [];
    if (possibleSenders.some(s => senders.includes(s))) {
      for (const pattern of rule.patterns) {
        let patternStr = pattern.regex;
        let flags = '';
        // Handle embedded case-insensitive flag
        if (patternStr.startsWith('(?i)')) {
          flags += 'i';
          patternStr = patternStr.replace('(?i)', '');
        }
        const regex = new RegExp(patternStr, flags);
        const match = regex.exec(sms.body);
        if (!match) continue;        
        const data: Record<string, string> = {};
        const fields = pattern.data_fields || {};
        let txnType: string | undefined;
        for (const [field, fieldConfig] of Object.entries(fields)) {
          const groupId = fieldConfig.group_id;
          const value = match[groupId];
          if (groupId >= 0 && value) {
            data[field] = value.trim();
          }
        }
        // Handle transaction_type_rule
        const txnRule = pattern.data_fields?.transaction_type_rule;
        // if (txnRule && txnRule.rules && typeof txnRule.group_id === 'number') {
        //   const groupValue = match[txnRule.group_id]?.toLowerCase().trim();
        //   for (const tRule of txnRule.rules) {
        //     const expected = tRule.value?.toLowerCase().trim();
        //     if (!expected || groupValue?.includes(expected)) {
        //       txnType = tRule.txn_type;
        //       if (tRule.pos_override) {
        //         data['pos'] = tRule.pos_override;
        //       }
        //       break;
        //     }
        //   }
        // }        
        console.log({
          sender: sms.sender,
          body: sms.body,
          sms_type: pattern.sms_type,
          extracted: data,
        });
        return {
          sender: sms.sender,
          body: sms.body,
          sms_type: pattern.sms_type,
          extracted: data,
        };
      }
    }
  }

  return null;
}

const App = () => {
  const [messages, setMessages] = useState<TxnMsg[]>([]);

  const fetchMessages = async () => {
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
        });
      }
    }

    setMessages(parsed);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
              ₹ {item.amount?.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

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
