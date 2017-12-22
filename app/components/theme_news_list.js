import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Common from '../static/js/common';


class EditorsInfo extends Component{
    constructor(props){
        super(props);
    }

    _renderItem = ({item}) => {
        return (
            <Image 
                source={{uri: item.avatar}}
                style={styles.avator}
            />
            // <Text>{item.name}</Text>
        )
    }
    _keyExtractor = (item, index) => item.id;

    render(){
        const { editors, navigation, nightMode } = this.props;
        if(editors){
            // alert(JSON.stringify(editors))
            return(
                <TouchableHighlight
                    style={{flex:1}}
                    underlayColor="transparent"
                    onPress={()=>{
                        navigation.navigate('Editors', { editors: editors })
                    }}
                >
                    <View style={styles.theme_editors}>
                        <FlatList
                            ListEmptyComponent={()=><View style={styles.avator}>66666</View>}
                            keyExtractor={this._keyExtractor}
                            ListHeaderComponent={<Text style={{color: `${nightMode}`?"#bebebe":"#333", fontSize: 14, marginTop: 5, marginRight: 10}}>主编</Text>}
                            renderItem={this._renderItem}
                            horizontal={true}
                            data={editors}
                        />
                    </View>
                </TouchableHighlight>
            );
        }else{
            return <Text style={{display: "none"}}></Text>;
        }
        
    }
}


class ThemeNewsList extends Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
    }

    _renderItem = ({item})=>{
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
                    {
                        item.images ?
                        <View style={styles.news_img_box}>
                            <Image
                                source={{uri: item.images[0]}}
                                style={styles.news_img}
                            />
                        </View>
                        :<Text style={{display: "none"}}></Text>
                    }
                </View>
            </TouchableHighlight>
        )
    }

    _keyExtractor = (item, index) => item.id;

    render(){
        const { data, navigation } = this.props;
        if(!data){
            return (
                <ActivityIndicator size="large" />
            )
        }else{
            
            return (
                // <Text>6666666</Text>
                <View style={{flex:1}}>
                    <View style={styles.title_box} >
                        <Image
                            source={{uri: data.background}}
                            style={styles.title_img}
                        />
                        <Text style={styles.title_txt}>{data.description}</Text>
                    </View>
                    <FlatList
                        style={styles.news_list}
                        renderItem={this._renderItem}
                        ListHeaderComponent={<EditorsInfo editors={data.editors} nightMode={this.props.nightMode} navigation={navigation} />}
                        keyExtractor={this._keyExtractor}
                        data={data.stories}
                    />
                </View>
            )
        }
    }
}

const {width} = Dimensions.get('window'); 

const styles = StyleSheet.create({
    title_box: {
        height: 200,
        position: "relative",
        backgroundColor: "#333"
    },
    title_txt: {
        position: "absolute",
        bottom: 15,
        fontSize: 18,
        color: "#fff",
        paddingHorizontal: 20
    },
    title_img: {
        height: 200
    },
    theme_editors: {
        paddingVertical: 10,
    },
    avator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
    },
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
    news_title: {
        fontSize: 18,
        color: "#000"
    },
    news_title_n: {
        color: "#f3f3f3"
    },
    news_box: {
        flex: 2,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: "#fff",
        borderRadius: 5,
        minHeight: 80
    },
    news_bg:{
        backgroundColor: "#fff"
    },
    news_bg_n:{
        backgroundColor: "#404040"
    },
    news_img: {
        width: 60,
        height: 60
    },
    multipic: {
        position: "absolute",
        bottom: 10,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
        color:　"#fff",
    },
    news_title: {
        flex: 8,
        fontSize: 18,
        color: "#000"
    },
    news_title_n: {
        color: "#f3f3f3"
    }
})
export default ThemeNewsList;