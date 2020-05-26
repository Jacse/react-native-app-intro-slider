import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    title: 'Title 1',
    image: require('../../assets/1.jpg'),
    bg: '#59b2ab',
  },
  {
    title: 'Title 2',
    image: require('../../assets/2.jpg'),
    bg: '#febe29',
  },
  {
    title: 'Rocket guy',
    image: require('../../assets/3.jpg'),
    bg: '#22bcb5',
  },
];

type Item = typeof data[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 32,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default class App extends React.Component {
  _renderItem = ({item}: {item: Item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.bg,
        }}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
        </SafeAreaView>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.title;

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          bottomButton
          showSkipButton
          showPrevButton
          data={data}
        />
      </View>
    );
  }
}
