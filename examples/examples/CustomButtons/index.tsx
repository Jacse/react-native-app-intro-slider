import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/1.jpg'),
    bg: '#59b2ab',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/2.jpg'),
    bg: '#febe29',
  },
  {
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
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
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends React.Component {
  _renderItem = ({item}: {item: Item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.title;

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderItem={this._renderItem}
          data={data}
        />
      </View>
    );
  }
}
