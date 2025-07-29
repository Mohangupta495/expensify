import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CheckCircle2, MessageSquare, MessageSquareOff, ShieldOff } from 'lucide-react-native';
import { Colors } from '../utils/Colors'; // adjust as per your color scheme
// import { useNavigation } from '@react-navigation/native';
import { ImageLink } from '../utils/ImageLink';

const { width } = Dimensions.get('window');

const SMSPermissionScreen = () => {
//   const navigation = useNavigation();

  const handleGrantPermission = () => {
    // Call PermissionsAndroid.request(...) here for SMS permission
    // Then navigate or update state
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
      <MessageSquare size={20} color="#fff" />
      </View>

      <Text style={styles.heading}>SMS permission</Text>
      <Text style={styles.subtext}>
        This helps us process your transactional SMS into your spends & bill reminders
      </Text>

      <View style={styles.ruleRow}>
        <MessageSquareOff size={20} color="#aaa" />
        <Text style={styles.ruleText}>No OTP</Text>
      </View>
      <View style={styles.ruleRow}>
        <ShieldOff size={20} color="#aaa" />
        <Text style={styles.ruleText}>No personal SMS</Text>
      </View>

      <Image
        source={ImageLink.lineMat} // screenshot-like UI image
        style={styles.mockImage}
        resizeMode="contain"
      />

      {/* <View style={styles.backupRow}>
        <CheckCircle2 color={Colors.black} size={20} />
        <Text style={styles.backupText}>Backup & Restore</Text>
      </View> */}

      <TouchableOpacity onPress={handleGrantPermission} style={styles.grantButton}>
        <Text style={styles.grantButtonText}>Grant SMS permission</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By giving permission you agree to{' '}
        <Text style={styles.link}>spendo terms of use</Text> and{' '}
        <Text style={styles.link}>privacy policy</Text>
      </Text>
    </View>
  );
};

export default SMSPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  iconWrapper: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    // tintColor: Colors.primary || '#3fc35f',
  },
  heading: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#aaa',
  },
  mockImage: {
    width: width * 0.9,
    height: 300,
    marginVertical: 20,
  },
  backupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backupText: {
    color: '#aaa',
    fontSize: 14,
  },
  grantButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 32,
    marginBottom: 20,
  },
  grantButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  terms: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.primary,
  },
  success:{}
});
