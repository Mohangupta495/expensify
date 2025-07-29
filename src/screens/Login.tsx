import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { ImageLink } from '../utils/ImageLink';
import { Colors } from '../utils/Colors';
import { Eye, EyeClosed } from 'lucide-react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Configure Google Signin (if not done in App.tsx)
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    });

    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const googleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userinfo", userInfo);

    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
        }
    }
  };
  const handleFacebookLogin = async () => {
    try {
        // Once signed in, get the user AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await auth().signInWithCredential(facebookCredential);
        console.log('User signed in with Facebook!', userCredential.user);        
    } catch (error) {
        console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  const signOutGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
      Alert.alert('Logged Out', 'Successfully signed out');
    } catch (error) {
      console.error('Google Sign-out Error', error);
      Alert.alert('Error', 'Sign out failed');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImageLink.loginTheme}
        style={styles.backgroundImage}
      >
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Image source={ImageLink.logo} style={styles.logo} />
            <Text style={styles.logoTitle}>SpenDo</Text>
          </View>

          <Text style={styles.title}>Sign in to your{'\n'}Account</Text>

          <View style={styles.signUpContainer}>
            <Text style={styles.subtitle}>Don’t have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputTitle}>Email</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter your email"
            placeholderTextColor={Colors.textGray}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
          />
        </View>

        <View style={styles.formInputContainer}>
          <Text style={styles.formInputTitle}>Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="***********234"
              placeholderTextColor={Colors.textGray}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              textContentType="password"
              autoComplete="password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={16} color={Colors.textGray} />
              ) : (
                <EyeClosed size={16} color={Colors.textGray} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialContainer}>
          {user ? (
            <TouchableOpacity style={styles.socialButton} onPress={signOutGoogle}>
              <Text style={styles.socialButtonText}>Logout Google</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.socialButton} onPress={googleLogin}>
              <Image source={ImageLink.google} style={styles.socialButtonImage} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          )}
          {/* <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log("logout.")}/> */}
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
            <Image
              source={ImageLink.facebook}
              style={styles.socialButtonImage}
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By logging in, you agree to our</Text>
          <Text style={styles.termsText}>
            <Text style={{ color: Colors.black, fontWeight: 'bold' }}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={{ color: Colors.black, fontWeight: 'bold' }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};


export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backgroundImage: {
    width: '100%',
    paddingBottom: 50,
  },
  innerContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  logoTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 40,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
  },
  signUp: {
    fontSize: 14,
    color: Colors.linkColor,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  formInputContainer: {
    marginTop: 20,
  },
  formInputTitle: {
    fontSize: 13,
    color: Colors.textGray,
    marginLeft: 4,
  },
  formInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 3,
    backgroundColor: '#fff',
    color: 'black',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // Android shadow
    elevation: 2,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 3,
    backgroundColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // Android shadow
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    color: 'black',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgotPassword: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.linkColor,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  orText: {
    fontSize: 14,
    color: Colors.textGray,
    marginHorizontal: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  socialButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 30,
  },
  socialButtonText: {
    fontSize: 14,
    color: Colors.textGray,
    fontWeight: 'bold',
  },
  socialButtonImage: {
    width: 20,
    height: 20,
  },
  termsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: Colors.textGray,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 18,    
  },
});
