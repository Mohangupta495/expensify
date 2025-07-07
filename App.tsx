import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import NativeSMSReader, { SMS } from './specs/NativeSMSReader';
import bankSenderCodes from './src/data/banksJson';

type TxnMsg = SMS & {
  amount?: number;
  maskedAccount?: string;
  bankName?: string;
  type?: 'credit' | 'debit';
  txnDate?: Date;
};

const App = () => {
  const [messages, setMessages] = useState<TxnMsg[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<TxnMsg[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [bankList, setBankList] = useState<string[]>([]);

  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);
      return (
        granted['android.permission.READ_SMS'] === 'granted' &&
        granted['android.permission.RECEIVE_SMS'] === 'granted'
      );
    }
    return true;
  };

  const parseAmount = (text: string): number | null => {
    const match = text.match(/(?:rs\.?|inr|₹)\s?([\d,]+\.?\d{0,2})/i);
    if (match) {
      const amt = match[1].replace(/,/g, '');
      return parseFloat(amt);
    }
    return null;
  };

  const getTxnType = (text: string): 'credit' | 'debit' => {
    const lower = text.toLowerCase();
    if (/(credited|received)/.test(lower)) return 'credit';
    return 'debit';
  };

  const extractDateFromBody = (body: string): Date | null => {
    const match = body.match(/\b(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})\b/);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      let year = parseInt(match[3], 10);
      if (year < 100) year += 2000;
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const fetchMessages = async () => {
    const allSMS: SMS[] = await NativeSMSReader.getAllSMS();
    const bankMessages = allSMS.filter((msg) => {
      const sender = msg.address?.split('-').pop();
      return sender && bankSenderCodes[sender];
    });

    const accountNumberRegex = /(?:x{2,}|X{2,}|\*{2,})\d{3,5}/g;
    const amountRegex = /(rs\.?|inr|₹)\s?\d+([,.]\d{1,2})?/i;
    const transactionKeywords = ['debited', 'credited', 'spent', 'withdrawn', 'purchase', 'paid', 'received'];
    const blacklistKeywords = ['otp', 'one time password', 'e-statement', 'statement ready', 'login using otp'];

    const filtered = bankMessages
      .map((msg): TxnMsg | null => {
        const body = msg.body?.toLowerCase() || '';
        const sender = msg.address?.split('-').pop();
        const hasAccount = accountNumberRegex.test(body);
        const hasAmount = amountRegex.test(body);
        const hasTxnKeyword = transactionKeywords.some((kw) => body.includes(kw));
        const isNotBlacklisted = !blacklistKeywords.some((kw) => body.includes(kw));

        if (hasAccount && hasAmount && hasTxnKeyword && isNotBlacklisted) {
          const amt = parseAmount(msg.body || '');
          const masked = (msg.body?.match(accountNumberRegex) || [])[0];
          const type = getTxnType(msg.body || '');
          const txnDate = extractDateFromBody(msg.body || '') || new Date(Number(msg.date));

          return {
            ...msg,
            amount: amt ?? 0,
            maskedAccount: masked,
            bankName: bankSenderCodes[sender!] || sender,
            type,
            txnDate,
          };
        }
        return null;
      })
      .filter(Boolean) as TxnMsg[];

    const uniqueBanks = Array.from(new Set(filtered.map((m) => m.bankName || ''))).sort();
    setBankList(uniqueBanks);
    setMessages(filtered);
    applyFilters(filtered, selectedBank, fromDate, toDate);
  };

  const applyFilters = (
    data: TxnMsg[],
    bank: string,
    from: Date | null,
    to: Date | null
  ) => {
    const filtered = data.filter((msg) => {
      const msgDate = msg.txnDate || new Date(Number(msg.date));
      const inBank = !bank || msg.bankName === bank;
      const inDate =
        (!from || msgDate >= from) &&
        (!to || msgDate <= new Date(to.getTime() + 86400000));
      return inBank && inDate;
    });
    setFilteredMessages(filtered);
  };

  useEffect(() => {
    requestSMSPermission().then(fetchMessages);
  }, []);

  useEffect(() => {
    applyFilters(messages, selectedBank, fromDate, toDate);
  }, [messages, selectedBank, fromDate, toDate]);

  const creditTotal = filteredMessages
    .filter((m) => m.type === 'credit')
    .reduce((sum, m) => sum + (m.amount ?? 0), 0);

  const debitTotal = filteredMessages
    .filter((m) => m.type === 'debit')
    .reduce((sum, m) => sum + (m.amount ?? 0), 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <Pressable style={styles.button} onPress={fetchMessages}>
        <Text style={styles.buttonText}>Sync Bank SMS</Text>
      </Pressable>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedBank}
            onValueChange={(val) => setSelectedBank(val)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select Bank" value="" />
            {bankList.map((bank) => (
              <Picker.Item key={bank} label={bank} value={bank} />
            ))}
          </Picker>
        </View>

        <Pressable onPress={() => setShowFromPicker(true)} style={styles.input}>
          <Text>{fromDate ? fromDate.toDateString() : 'From Date'}</Text>
        </Pressable>
        <Pressable onPress={() => setShowToPicker(true)} style={styles.input}>
          <Text>{toDate ? toDate.toDateString() : 'To Date'}</Text>
        </Pressable>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowFromPicker(false);
            if (d) setFromDate(d);
          }}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowToPicker(false);
            if (d) setToDate(d);
          }}
        />
      )}

      {/* Transactions List */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item, index) => `${item.address}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.sender}>
              {/* {item.bankName} ({item.maskedAccount}) */}
              {item.body}
            </Text>
            <Text
              style={[
                styles.amount,
                { color: item.type === 'credit' ? 'green' : 'red' },
              ]}
            >
              ₹ {item.amount?.toFixed(2)}
            </Text>
            <Text style={styles.date}>
              {item.txnDate?.toLocaleString()}
            </Text>
          </View>
        )}
      />

      {/* Totals */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Credit: ₹ {creditTotal.toFixed(2)}</Text>
        <Text style={styles.totalText}>Debit: ₹ {debitTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default App;

// styles unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#1e90ff',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filters: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  totalBox: {
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006064',
    marginVertical: 4,
  },
});
