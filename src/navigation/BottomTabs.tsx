import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Shuffle,
  Plus,
  PieChart,
  User,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat2,
  X,
} from 'lucide-react-native';
import { ImageLink } from '../utils/ImageLink';
import { Colors } from '../utils/Colors';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Dummy Screens
const DummyScreen = ({ name }: any) => (
  <View style={styles.screen}><Text>{name} Screen</Text></View>
);

// Custom FAB Menu
const FabMenu = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const animation = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: isOpen ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const getStyle = (x: number, y: number) => ({
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        }),
      },
    ],
    opacity: animation,
  });

  return (
    <>
      <Animated.View style={[styles.fabOption, getStyle(0, -90), { backgroundColor: '#0F9D58' }]}>
        {/* <ArrowDownToLine color="#fff" size={22} /> */}
        <Image style={{height:26,width:22}} source={ImageLink.currency_exchange}/>
      </Animated.View>
      <Animated.View style={[styles.fabOption, getStyle(-70, -50), { backgroundColor: '#DB4437' }]}>
        {/* <ArrowUpFromLine color="#fff" size={22} /> */}
        <Image style={{height:26,width:22}} source={ImageLink.expense}/>
      </Animated.View>
      <Animated.View style={[styles.fabOption, getStyle(70, -50), { backgroundColor: '#4285F4' }]}>
        {/* <Repeat2 color="#fff" size={22} /> */}
        <Image style={{height:26,width:22}} source={ImageLink.income}/>
      </Animated.View>

      <TouchableOpacity onPress={toggle} style={styles.plusButton}>
        {isOpen ? <X color="#fff" size={28} /> : <Plus color="#fff" size={28} />}
      </TouchableOpacity>
    </>
  );
};

// Custom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const [fabOpen, setFabOpen] = useState(false);
  const toggleFab = () => setFabOpen(!fabOpen);

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Add') return toggleFab();
          if (!isFocused) navigation.navigate(route.name);
        };

        const icons: any = {
          Home: Home,
          Transactions: Shuffle,
          Budget: PieChart,
          Profile: User,
        };

        if (route.name === 'Add') {
          return (
            <View key="fab-container" style={styles.fabContainer}>
              <FabMenu isOpen={fabOpen} toggle={toggleFab} />
            </View>
          );
        }

        const Icon = icons[route.name];

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon color={isFocused ? '#7F3DFF' : '#B0B0B0'} size={24} />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={() => <HomeScreen/>} />
      <Tab.Screen name="Transactions" component={() => <DummyScreen name="Transactions" />} />
      <Tab.Screen name="Add" component={() => <DummyScreen name="Add Trigger" />} />      
      <Tab.Screen name="Budget" component={() => <DummyScreen name="Budget" />} />
      <Tab.Screen  name="Profile" component={() => <DummyScreen name="Profile" />} />
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor:Colors.white
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 4,
  },
  labelFocused: {
    color: '#7F3DFF',
    fontWeight: '600',
  },
  plusButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7F3DFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex:11111
  },
  fabContainer: {
    // position: 'absolute',
    bottom: 28, // ✅ FAB sits nicely above the tab bar
    // left: (width - 64) / 2,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fabOption: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
    alignSelf: 'center',
  },
});
