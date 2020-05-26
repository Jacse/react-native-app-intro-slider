import React from 'react';
import {View, Text, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    text: 'This photo is of Italy.\nBy @peter_mc_greats',
    image: require('../../assets/img-1.jpg'),
  },
  {
    text: 'This photo is of Austria.\nBy @8moments',
    image: require('../../assets/img-2.jpg'),
  },
  {
    text: 'This photo is of Iceland.\nBy @r3dmax',
    image: require('../../assets/img-3.jpg'),
  },
];

type Item = typeof data[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    color: '#333',
    marginTop: 92,
    textAlign: 'center',
  },
});

export default class App extends React.Component {
  _renderItem = ({item}: {item: Item}) => {
    return (
      <ImageBackground style={styles.slide} source={item.image}>
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    );
  };

  _keyExtractor = (item: Item) => item.text;

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={data}
        />
      </View>
    );
  }
}
