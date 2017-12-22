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
const { width, height } = Dimensions.get('window');

import Common from '../static/js/common';



class ShareModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            channel_show: false
        }
    }

    _keyExtractor = (item, index) => index;

    getIcon = (name) => {
        switch(name){
            case "qq": {
                return {src: require('../static/images/qq_icon.png')}
            }
            case "sina": {
                return {src: require('../static/images/sina_icon.png')}
            }
            case "weixin": {
                return {src: require('../static/images/weixin_icon.png')}
            }
            case "moment": {
                return {src: require('../static/images/moment_icon.png')}
            }
            case "ever": {
                return {src: require('../static/images/ever_icon.png')}
            }
            case "more": {
                return {src: require('../static/images/more_icon.png')}
            }
            case "youdao": {
                return {src: require('../static/images/youdao_icon.png')}
            }
        }
    }

    _renderItem = ({ item })=>{
        return (
            <View style={styles.channel_item}>
                <Image
                    source={this.getIcon(item.icon_name).src}
                    style={styles.icon}
                />
                <Text style={styles.name}>{item.name}</Text>
            </View>
        )
    }

    render(){
        const { modal_show} = this.props;
        const { onModalToggle } = this.props;
        console.log(this.props)
        if(channel){
            return (
                <Modal
                    style={{flex: 1}}
                    animationType="fade"
                    transparent={true}
                    visible={modal_show}
                    onRequestClose={()=>{alert(666)}}
                >
                    <TouchableHighlight
                        style={styles.modal_mask}
                        underlayColor="transparent"
                        onPress={onModalToggle}
                    >
                        <View  />
                    </TouchableHighlight>
                    <View style={styles.modal_box}>
                        <View style={styles.channel_list}>
                            <FlatList
                                data={channel}
                                numColumns={3}
                                horizontal={false}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                ListHeaderComponent={()=><Text style={styles.title}>分享</Text>}
                            />
                        </View>
                    </View>
                </Modal>
    )
        }else{
            return <ActivityIndicator size="large" />
        }
    }
}

const styles = StyleSheet.create({
    modal_box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal_mask: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    channel_list: {
        width: width*0.7,
        minHeight: height*0.5,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    title: {
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    channel_item: {
        flex: 1,
        borderRightColor: "#000",
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 5
    },
    name: {
        fontSize: 12,
        color: "#ccc"
    }
});
const channel = [
    {name: "新浪微博", icon_name: "sina"},
    {name: "微信", icon_name: "weixin"},
    {name: "微信朋友圈", icon_name: "moment"},
    {name: "印象笔记", icon_name: "ever"},
    {name: "有道云笔记", icon_name: "youdao"},
    {name: "QQ", icon_name: "qq"},
    {name: "更多平台", icon_name: "more"},
];
export default ShareModal;