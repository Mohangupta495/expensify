import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface TransactionRecord {
  id: string;
  sender: string;
  body: string;
  sms_type: string;
  pattern_UID: string;
  sort_UID: string;
  account_type: string;

  transaction_type: string;
  amount: string;
  pan: string;
  pos: string;
  note: string;
  date: string;
  network_reference_id: string;
  account_balance: string;
}

export interface TransactionInput extends Omit<TransactionRecord, 'id'> {}

export interface Spec extends TurboModule {
  insertTransaction(
    sender: string,
    body: string,
    sms_type: string,
    pattern_UID: string,
    sort_UID: string,
    account_type: string,
    transaction_type: string,
    amount: string,
    pan: string,
    pos: string,
    note: string,
    date: string,
    network_reference_id: string,
    account_balance: string
  ): Promise<string>;

  insertTransactionsList(transactions: TransactionInput[]): Promise<string>;

  getAllTransactions(): Promise<TransactionRecord[]>;
   clearAllTransactions(): Promise<string>;
  deleteDatabase(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TransactionDBModule');
