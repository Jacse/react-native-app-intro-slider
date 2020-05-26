import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    text: 'Description.\nSay something cool',
    bg: '#59b2ab',
  },
  {
    text: 'Other cool stuff',
    bg: '#febe29',
  },
  {
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    bg: '#22bcb5',
  },
];

type Item = typeof data[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
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
        <SafeAreaView>
          <Text style={styles.text}>{item.text}</Text>
        </SafeAreaView>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.text;

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{width: '80%', height: '70%'}}>
          <AppIntroSlider
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            data={data}
          />
        </View>
      </View>
    );
  }
}
