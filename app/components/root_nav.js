import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomePage from '../pages/home';
import DetailPage from '../pages/news_detail';
import LoginPage from '../pages/login';
import CommentsPage from '../pages/comments';
import ThemePage from '../pages/theme';
import EditorsPage from '../pages/editors';
import ProfilePage from '../pages/profile';

import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

const StackNavigation = StackNavigator({
    Home: {
        navigationOptions: {
            header: null,
        },
        screen: HomePage
    },
    Detail:{
        screen: DetailPage
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            headerTitle: '登录',
            headerStyle: {
                backgroundColor: "#008bed"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    },
    Comments: {
        screen: CommentsPage,
    },
    Theme: {
        screen: ThemePage,
    },
    Editors: {
        screen: EditorsPage
    },
    Profile: {
        screen: ProfilePage
    }
});

export default StackNavigation;