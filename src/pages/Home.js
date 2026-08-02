import * as React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Policy from './Policy';
import Loan from './Loan';
import MutualFund from './MutualFund';

const FirstRoute = () => (
  <ScrollView fadingEdgeLength={50} style={[styles.container, { backgroundColor: '#fff' }]} >
    <Policy />

  </ScrollView>
);
const SecondRoute = () => (
  <ScrollView fadingEdgeLength={50} style={[styles.container, { backgroundColor: '#fff' }]} >
    <Loan />
  </ScrollView>
);
const ThirdRoute = () => (
  <ScrollView fadingEdgeLength={50} style={[styles.container, { backgroundColor: '#fff' }]} >
    <MutualFund />
  </ScrollView>
);
export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Policy' },
      { key: 'second', title: 'Loan' },
      // { key: 'third', title: 'Mutual Funds' },

    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity, fontWeight: "bold", fontSize: 16, color: '#dadada' }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third : ThirdRoute,
  });

  render() {
    return (
      // <TabView
      //   navigationState={this.state}
      //   renderScene={this._renderScene}
      //   renderTabBar={this._renderTabBar}
      //   onIndexChange={this._handleIndexChange}
      //   collapsable={true}
      //   accessibilityIgnoresInvertColors
      // // swipeEnabled ={false}
      // // style={{maxHeight : "100%"}}
      // />

      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#12124a'
  },
});
