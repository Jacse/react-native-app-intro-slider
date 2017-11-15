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

  goToSlide = (pageNum) => {
    this.setState({ activeIndex: pageNum });
    this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
  }

  _renderItem = (item) => {
    const { width, height } = this.state;
    const bottomSpacer = (this.props.bottomButton ? 44 : 0) + (isIphoneX ? 98 : 64);
    const topSpacer = (isIphoneX ? 44 : 0) + (Platform.OS === 'ios' ? 20 : 0);
    const props = { ...item.item, bottomSpacer, topSpacer };
    return (
      <View style={{ height, width }}>
        {this.props.renderItem ? this.props.renderItem(props) : (
          <DefaultSlide {...props}/>
        )}
      </View>
    );
  }

  _renderButton = (content, onPress) => {
    return (
      <View style={this.props.bottomButton ? styles.bottomButtonContainer : styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={this.props.bottomButton  && {flex: 1}}>
          {content}
        </TouchableOpacity>
      </View>
    )
  }

  _onNext = () => {
    this.props.onNext === 'function' && this.props.onNext();
    this.goToSlide(this.state.activeIndex + 1);
  }

  _renderNextButton = () => {
    let content = this.props.renderNextButton ? this.props.renderNextButton() : <Text style={styles.buttonText}>Next</Text>;
    if (this.props.bottomButton) {
      content = <View style={styles.bottomButton}>{content}</View>;
    }
    return this._renderButton(content, this._onNext);
  }

  _renderDoneButton = () => {
    let content = this.props.renderDoneButton ? this.props.renderDoneButton() : <Text style={styles.buttonText}>Done</Text>;
    if (this.props.bottomButton) {
      content = <View style={styles.bottomButton}>{content}</View>;
    }
    return this._renderButton(content, this.props.onDone && this.props.onDone);
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

    const btn = this.state.activeIndex < (this.props.slides.length - 1 ) ? this._renderNextButton() : this._renderDoneButton();

    return (
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationDots, this.props.paginationStyle]}>
          {this.props.slides.map((_, i) => (
            i === this.state.activeIndex
              ? React.cloneElement(ActiveDot, { key: i })
              : React.cloneElement(Dot, { key: i })
          ))}
          {!this.props.bottomButton && btn}
        </View>
        {this.props.bottomButton && btn}
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
          bounces={false}
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
  paginationContainer: {
    position: 'absolute',
    bottom: 16 + (isIphoneX ? 34 : 0),
    left: 0,
    right: 0,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
  },
  bottomButtonContainer: {
    height: 44,
    marginHorizontal: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  }
});
