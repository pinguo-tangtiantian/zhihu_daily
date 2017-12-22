import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableHighlight, ActivityIndicator, FlatList, SectionList } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Common from '../static/js/common';

class HomeNewsList extends Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
    }

    _renderItem = (section)=>{
        const item = section.item;
        const { nightMode } = this.props;
        return (
            <TouchableHighlight
                style={{flex: 1}}
                key={item.id}
                underlayColor="transparent"
                onPress={()=>{
                    this.navigation.navigate('Detail', {news_id: item.id})
                }}
            >
                <View key={item.id} style={[styles.news_box, nightMode&&styles.news_bg_n]}>
                    <Text style={[styles.news_title, nightMode&&styles.news_title_n]}>{item.title}</Text>
                    <Image
                        source={{uri: item.images[0]}}
                        style={styles.news_img}
                    />
                    {
                        item.multipic? <Text style={styles.multipic}>多图</Text>: null
                    }
                </View>
            </TouchableHighlight>
        )
    }

    _keyExtractor = (item, index) => item.id;

    _renderSectionHeader = ( {section} ) =>{
        const { today, nightMode } = this.props;
        const date = section.time;

        if(today == date){
            return <Text style={[styles.news_date, nightMode&&styles.news_date_n]}>今日热闻</Text>;
        }else{
            const fmtDate = Common.getFmtTime("fmtdate", date, "f2");
            return <Text style={[styles.news_date, nightMode&&styles.news_date_n]}>{fmtDate}</Text>
        }
    }

    render(){
        const all_news = this.props.all_news;
        if(!all_news[0]){
            return (
                <ActivityIndicator size="large" />
            )
        }else{
            return (
                // <View style={styles.news_list}>
                    <SectionList
                        style={styles.news_list}
                        renderItem={this._renderItem}
                        ListEmptyComponent={()=><Text>Loading</Text>}
                        keyExtractor={this._keyExtractor}
                        renderSectionHeader={this._renderSectionHeader}
                        sections={all_news}
                    />
                // </View>
            )
        }
    }
}

const {width} = Dimensions.get('window'); 

const styles = StyleSheet.create({
    news_list: {
        flex: 1,
        padding: 10
    },
    news_date: {
        padding: 10,
        color: "#6f6f6f",
    },
    news_date_n: {
        color: "#bebebe"
    },
    news_box: {
        flex: 1,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        minHeight: 80,
        paddingRight: 90,
        backgroundColor: "#fff",
        borderRadius: 5,
        position: "relative",
    },
    news_bg:{
        backgroundColor: "#fff"
    },
    news_bg_n:{
        backgroundColor: "#404040"
    },
    news_img: {
        width: 60,
        height: 60,
        position: "absolute",
        top: 10,
        right: 20
    },
    multipic: {
        position: "absolute",
        bottom: 10,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
        color:　"#fff",
    },
    news_title: {
        fontSize: 18,
        color: "#000"
    },
    news_title_n: {
        color: "#f3f3f3"
    }
})
export default HomeNewsList;