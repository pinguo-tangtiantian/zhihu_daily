import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

class BannerNews extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { hot_news } = this.props;
        if(!hot_news[0]){
            return (
                <View style={{flex: 2}}>
                    <Text></Text>
                </View>
            )
        }else{
            return (
                <View style={{height:200}}>
                    <Swiper
                        style={styles.swiper}
                        autoplay={true}
                        activeDotColor="#fff"
                        paginationStyle={{position:'absolute', bottom: 10}}
                        >
                    {
                        hot_news.map((news, index)=>{
                            return (
                                <TouchableHighlight
                                    style={styles.slide}
                                    key={`swiper${index}`}
                                    data-id={news.id}
                                    underlayColor="transparent"
                                    onPress={()=>{
                                        this.props.navigation.navigate('Detail', {news_id: news.id})
                                    }}>
                                <View style={styles.slide} >
                                    <Image
                                        source={{uri: news.image}}
                                        style={styles.banner_img}
                                    />
                                    <Text style={styles.banner_title}>{news.title}</Text>
                                </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                    </Swiper>
                </View>
            )
        }
    }
}

const {width} = Dimensions.get('window'); 

const styles = StyleSheet.create({
    swiper: {
        flex: 1
    },
    slide: {
        flex: 1,
        position: "relative",
    },
    banner_title: {
        marginBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        position: "absolute",
        bottom: 20,
        color: "#eee",
        fontFamily: "Microsoft Yahei",
        fontSize: 20
    },

    banner_img: {
        flex: 1
    }
})
export default BannerNews;