import { SMS } from "../../specs/NativeSMSReader";

export function parseSms(config: any, sms: SMS & { sender: string }) {
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
        const txnRule = pattern.data_fields?.transaction_type_rule;

        if (
          txnRule
        ) {
          const groupValue = match[txnRule.group_id].toLowerCase().trim();
          for (const tRule of txnRule.rules) {
            const expected = tRule.value?.toLowerCase().trim() || '';
            if (!expected || groupValue.includes(expected)) {
              txnType = tRule.txn_type;
              data['transaction_type'] = txnType+"none"; // <-- this is important
              if (tRule.pos_override) {
                data['pos'] = tRule.pos_override;
              }
              break;
            }
          }
        }

        // Fallback if transaction_type_rule didn't resolve anything
        if (!txnType) {
          txnType =
            pattern.data_fields?.transaction_type || pattern.transaction_type;
          if (txnType) {
            data['transaction_type'] = txnType;
          }
        }
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