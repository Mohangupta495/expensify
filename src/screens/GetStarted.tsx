import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { ImageLink } from '../utils/ImageLink';
import { Colors } from '../utils/Colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Gain total control\nof your money',
    description: 'Become your own money manager and make every cent count',
    image: ImageLink.onBoarding1,
  },
  {
    key: '2',
    title: 'Know where your\nmoney goes',
    description: 'Track your transaction easily, with categories and financial report',
    image: ImageLink.onBoarding2,
  },
  {
    key: '3',
    title: 'Planning ahead',
    description: 'Setup your budget for each category so you stay in control',
    image: ImageLink.onBoarding3,
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      navigation.navigate('NextScreen');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      carouselRef.current?.scrollTo({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={600}
        data={slides}
        scrollAnimationDuration={400}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
          </View>
        )}
      />

      {/* Indicators */}
      <View style={styles.indicatorWrapper}>
        {slides.map((_, i) => (
          <View key={i} style={i === currentIndex ? styles.activeDot : styles.inactiveDot} />
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
      {currentIndex > 0 ? (
  <TouchableOpacity onPress={handleBack} style={styles.navButton}>
    <ChevronLeft color="#fff" size={24} />
  </TouchableOpacity>
) : (
  <View style={{ width: 32 }} /> // Placeholder to keep spacing
)}

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 50,
    justifyContent: 'space-between',
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:20,
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 32,
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight:400
  },
  image: {
    width: width * 0.85,
    height: 400,
    alignSelf: 'center',
    marginTop:10,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 6,
  },
  activeDot: {
    width: 18,
    height: 10,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginHorizontal: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius:5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
