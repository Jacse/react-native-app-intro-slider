"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const isAndroidRTL = react_native_1.I18nManager.isRTL && react_native_1.Platform.OS === 'android';
class AppIntroSlider extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            width: 0,
            height: 0,
            activeIndex: 0,
        };
        this.goToSlide = (pageNum, triggerOnSlideChange) => {
            const prevNum = this.state.activeIndex;
            this.setState({ activeIndex: pageNum });
            this.flatList?.scrollToOffset({
                offset: this._rtlSafeIndex(pageNum) * this.state.width,
            });
            if (triggerOnSlideChange && this.props.onSlideChange) {
                this.props.onSlideChange(pageNum, prevNum);
            }
        };
        // Get the list ref
        this.getListRef = () => this.flatList;
        // Index that works across Android's weird rtl bugs
        this._rtlSafeIndex = (i) => isAndroidRTL ? this.props.data.length - 1 - i : i;
        // Render a slide
        this._renderItem = (flatListArgs) => {
            const { width, height } = this.state;
            const props = { ...flatListArgs, dimensions: { width, height } };
            // eslint-disable-next-line react-native/no-inline-styles
            return <react_native_1.View style={{ width, flex: 1 }}>{this.props.renderItem(props)}</react_native_1.View>;
        };
        this._renderButton = (name, label, onPress, render) => {
            const content = render ? render() : this._renderDefaultButton(name, label);
            return this._renderOuterButton(content, name, onPress);
        };
        this._renderDefaultButton = (name, label) => {
            let content = <react_native_1.Text style={styles.buttonText}>{label}</react_native_1.Text>;
            if (this.props.bottomButton) {
                content = (<react_native_1.View style={[
                    name === 'Skip' || name === 'Prev'
                        ? styles.transparentBottomButton
                        : styles.bottomButton,
                ]}>
          {content}
        </react_native_1.View>);
            }
            return content;
        };
        this._renderOuterButton = (content, name, onPress) => {
            const style = name === 'Skip' || name === 'Prev'
                ? styles.leftButtonContainer
                : styles.rightButtonContainer;
            return (<react_native_1.View style={!this.props.bottomButton && style}>
        <react_native_1.TouchableOpacity onPress={onPress} style={this.props.bottomButton && styles.flexOne}>
          {content}
        </react_native_1.TouchableOpacity>
      </react_native_1.View>);
        };
        this._renderNextButton = () => this.props.showNextButton &&
            this._renderButton('Next', this.props.nextLabel, () => this.goToSlide(this.state.activeIndex + 1, true), this.props.renderNextButton);
        this._renderPrevButton = () => this.props.showPrevButton &&
            this._renderButton('Prev', this.props.prevLabel, () => this.goToSlide(this.state.activeIndex - 1, true), this.props.renderPrevButton);
        this._renderDoneButton = () => this.props.showDoneButton &&
            this._renderButton('Done', this.props.doneLabel, this.props.onDone, this.props.renderDoneButton);
        this._renderSkipButton = () => 
        // scrollToEnd does not work in RTL so use goToSlide instead
        this.props.showSkipButton &&
            this._renderButton('Skip', this.props.skipLabel, () => this.props.onSkip
                ? this.props.onSkip()
                : this.goToSlide(this.props.data.length - 1), this.props.renderSkipButton);
        this._renderPagination = () => {
            const isLastSlide = this.state.activeIndex === this.props.data.length - 1;
            const isFirstSlide = this.state.activeIndex === 0;
            const secondaryButton = (!isFirstSlide && this._renderPrevButton()) ||
                (!isLastSlide && this._renderSkipButton());
            const primaryButton = isLastSlide
                ? this._renderDoneButton()
                : this._renderNextButton();
            return (<react_native_1.View style={styles.paginationContainer}>
        <react_native_1.SafeAreaView>
          <react_native_1.View style={styles.paginationDots}>
            {this.props.data.length > 1 &&
                this.props.data.map((_, i) => (<react_native_1.TouchableOpacity key={i} style={[
                    styles.dot,
                    this._rtlSafeIndex(i) === this.state.activeIndex
                        ? this.props.activeDotStyle
                        : this.props.dotStyle,
                ]} onPress={() => this.goToSlide(i, true)}/>))}
          </react_native_1.View>
          {primaryButton}
          {secondaryButton}
        </react_native_1.SafeAreaView>
      </react_native_1.View>);
        };
        this._onMomentumScrollEnd = (e) => {
            const offset = e.nativeEvent.contentOffset.x;
            // Touching very very quickly and continuous brings about
            // a variation close to - but not quite - the width.
            // That's why we round the number.
            // Also, Android phones and their weird numbers
            const newIndex = this._rtlSafeIndex(Math.round(offset / this.state.width));
            if (newIndex === this.state.activeIndex) {
                // No page change, don't do anything
                return;
            }
            const lastIndex = this.state.activeIndex;
            this.setState({ activeIndex: newIndex });
            this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
        };
        this._onLayout = ({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout;
            if (width !== this.state.width || height !== this.state.height) {
                // Set new width to update rendering of pages
                this.setState({ width, height });
                // Set new scroll position
                const func = () => {
                    this.flatList?.scrollToOffset({
                        offset: this._rtlSafeIndex(this.state.activeIndex) * width,
                        animated: false,
                    });
                };
                setTimeout(func, 0); // Must be called like this to avoid bugs :/
            }
        };
    }
    render() {
        // Separate props used by the component to props passed to FlatList
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const { renderPagination, activeDotStyle, dotStyle, skipLabel, doneLabel, nextLabel, prevLabel, renderItem, data, ...otherProps } = this.props;
        /* eslint-enable @typescript-eslint/no-unused-vars */
        return (<react_native_1.View style={styles.flexOne}>
        <react_native_1.FlatList ref={(ref) => (this.flatList = ref)} data={this.props.data} horizontal pagingEnabled showsHorizontalScrollIndicator={false} bounces={false} style={styles.flatList} renderItem={this._renderItem} onMomentumScrollEnd={this._onMomentumScrollEnd} extraData={this.state.width} onLayout={this._onLayout} 
        // make sure all slides are rendered so we can use dots to navigate to them
        initialNumToRender={data.length} {...otherProps}/>
        {renderPagination
            ? renderPagination(this.state.activeIndex)
            : this._renderPagination()}
      </react_native_1.View>);
    }
}
exports.default = AppIntroSlider;
AppIntroSlider.defaultProps = {
    activeDotStyle: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    dotStyle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    skipLabel: 'Skip',
    doneLabel: 'Done',
    nextLabel: 'Next',
    prevLabel: 'Back',
    showDoneButton: true,
    showNextButton: true,
    bottomButton: false,
};
const styles = react_native_1.StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        justifyContent: 'center',
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    leftButtonContainer: {
        position: 'absolute',
        left: 0,
    },
    rightButtonContainer: {
        position: 'absolute',
        right: 0,
    },
    bottomButton: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transparentBottomButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        padding: 12,
    },
});
