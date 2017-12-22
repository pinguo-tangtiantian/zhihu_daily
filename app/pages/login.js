import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import Common from '../static/js/common';


import Icon from 'react-native-vector-icons/FontAwesome';
class LoginPage extends Component {


    render() {
        const dateNow = Common.getFmtDate(new Date());
        
        return (
            <View style={styles.container}>
                <Image
                    source={require('../static/images/login_bg.jpeg')}
                    style={styles.login_bg}
                />
                <Text style={styles.title}>知乎日报</Text>
                <Text style={styles.tips_big}>使用微博登录</Text>
                <View style={styles.button_box}>
                    <View style={styles.button}>
                        <Icon name="weibo" color="#008bed" size={20} />
                        <Text style={{color: "#000"}}>新浪微博</Text>
                    </View>
                    <View style={styles.button}>
                        <Icon name="tencent-weibo" color="#008bed" size={20} />
                        <Text style={{color: "#000"}}>腾讯微博</Text>
                    </View>
                </View>
                <Text style={styles.tips_small}>知乎日报不会未经同意通过你的微博账号发布任何信息</Text>
            </View>
        );

    }
}

const {width, height} = Dimensions.get('window'); 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "nowrap",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    login_bg: {
        flex:1,
        width: width,
        height: height,
        // resizeMode:Image.resizeMode.cover,
        position: "absolute",
        backgroundColor:'rgba(0,0,0,0)',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 30,
        color: "#fff",
        // position: "absolute",
        // top: height*0.2,
        // left: width*0.5,
        // transform: [{translateX: -50}, {translateY: -20}]
        
    },
    tips_big: {
        color: "#eee",
        fontSize: 16,
        position: "absolute",
        top: height*0.55,
        left: width*0.5,
        transform: [{translateX: -50}, {translateY: -55}]
    },
    tips_small: {
        color: "#eee",
        fontSize: 12,
        position: "absolute",
        bottom: 10
    },
    button: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: width*0.7,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        margin: 5
    }
});

export default LoginPage;
