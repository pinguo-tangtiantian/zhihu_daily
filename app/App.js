/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import myCreateStores from './store';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    DrawerLayoutAndroid,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import StackNavigation from './components/root_nav';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const store = myCreateStores(); //初始化store



import TestPage from './components/test';
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Provider store={store}>
                <StackNavigation />
            {/* <TestPage /> */}
            </Provider>
        );
    }
}


export default App;
