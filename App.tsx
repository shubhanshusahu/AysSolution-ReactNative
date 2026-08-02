import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/components/redux/store.js'
import {Provider} from 'react-redux'
import Navigator from './src/components/Navigation/Nav.js'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <Navigator/>
          </Provider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}