import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    WebView,
    TouchableHighlight,
    ActivityIndicator,
    Modal,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Common from '../static/js/common';
const { width, height } = Dimensions.get('window');

class ProfilePage extends Component{
    constructor(props){
        super(props);
        // alert(JSON.stringify(this.props))
        const editor_id = this.props.navigation.state.params.id;
        this.state = {
            link: "https://news-at.zhihu.com/api/4/editor/"+editor_id+"/profile-page/android"
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: "主编资料",
        headerStyle: {
            backgroundColor: "#008bed",
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    });


    render() {
        const { link } = this.state;
        if(link){
            return (
                <WebView
                    style={{flex: 1}}
                    source={{uri: link}}
                />
            )
        }
    }
}

export default ProfilePage;