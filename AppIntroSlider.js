import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DefaultSlide from './DefaultSlide';

const { width, height } = Dimensions.get('window');

const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)
);

export default class AppIntroSlider extends React.Component {
  static defaultProps = {
    activeDotColor: 'rgba(255, 255, 255, .9)',
    dotColor: 'rgba(0, 0, 0, .2)',
  }
  constructor(props) {
    super(props);
    
    this.state = {
      width,
      height,
      activeIndex: 0,
    };
  }

  goToPage = (pageNum) => {
    this.setState({ activeIndex: pageNum });
    this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
  }

  _renderItem = (item) => {
    const { width, height } = this.state;
    if (this.props.renderItem) {
      return this.props.renderItem(item, { width, height });
    }
    return (
      <DefaultSlide
        width={width}
        height={height}
        {...item.item}
      />
    );
  }

  _onNext = () => {
    if (typeof this.props.onNext === 'function') {
      return this.props.onNext();
    }
    this.goToPage(this.state.activeIndex + 1);
  }

  _renderNextButton = () => {
    const hasFunc = typeof this.props.renderNextButton === 'function';
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this._onNext}>
          { hasFunc ? this.props.renderNextButton() : <Text style={styles.buttonText}>Next</Text>}
        </TouchableOpacity>
      </View>
    )
  }

  _onDone = () => {
    if (typeof this.props.onDone === 'function') {
      return this.props.onDone();
    }
  }

  _renderDoneButton = () => {
    const hasFunc = typeof this.props.renderDoneButton === 'function';
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this._onDone}>
        { hasFunc ? this.props.renderDoneButton() : <Text style={styles.buttonText}>Done</Text>}
        </TouchableOpacity>
      </View>
    )
  }

  _renderPagination = () => {
    if (this.props.slides.length <= 1) return null;

    const ActiveDot = this.props.activeDot || (
      <View style={[
        { backgroundColor: this.props.activeDotColor },
        styles.dot,
        this.props.activeDotStyle,
      ]} />
    );
    const Dot = this.props.dot || (
      <View style={[
        { backgroundColor: this.props.dotColor },
        styles.dot,
        this.props.dotStyle,
      ]} />
    );

    return (
      <View style={[styles.pagination, this.props.paginationStyle]}>
        {this.props.slides.map((_, i) => (
          i === this.state.activeIndex
            ? React.cloneElement(ActiveDot, { key: i })
            : React.cloneElement(Dot, { key: i })
        ))}
        {this.state.activeIndex < (this.props.slides.length - 1 ) ? this._renderNextButton() : this._renderDoneButton()}
      </View>
    )
  }

  _onMomentumScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = Math.round(offset / this.state.width);
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    this.setState({
      activeIndex: newIndex
    });
    if (typeof this.props.onSlideChange === 'function') {
      this.props.onSlideChange(newIndex);
    }
  }

  render() {
    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={this.props.slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.flexOne}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
        />
        {this._renderPagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: isIphoneX ? 34 : 0,
    left: 0,
    right: 0,
    height: 32 + 18 + 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 4, // total height = 18
  },
  buttonContainer: {
    position: 'absolute',
    right: 32,
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  }
});
