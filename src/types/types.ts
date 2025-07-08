import { SMS } from "../../specs/NativeSMSReader";

export type TxnMsg = SMS & {
  amount?: number;
  type?: 'credit' | 'debit';
  extracted?:any;
};
