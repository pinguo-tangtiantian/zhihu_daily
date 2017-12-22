import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    FlatList
} from 'react-native';

import Common from '../static/js/common';


import Icon from 'react-native-vector-icons/FontAwesome';

class CommentsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading_long: true,
            loading_short: true,
            long_comments: [],
            short_comments: [],
            short_show: false
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: `${navigation.state.params.total ? navigation.state.params.total : 0}条点评`,
        headerStyle: {
            backgroundColor: "#008bed",
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerRight:
            <TouchableHighlight
                style={{ flex: 1 }}
                underlayColor="transparent"
                onPress={() => {
                    navigation.navigate('Login')
                    // console.log(navigation)
                }}>
                <Icon name="pencil-square-o" size={20} color="#fff" style={{ margin: 15 }} />
            </TouchableHighlight>
            ,
        headerTintColor: "#fff"


    });

    componentWillMount(){
        const id = this.props.navigation.state.params.news_id;
        this.fetchLongComments(id);
        this.fetchShortComments(id);
    }

    fetchLongComments(news_id){
        fetch("https://news-at.zhihu.com/api/4/story/"+news_id+"/long-comments", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    long_comments: resJson.comments,
                    loading_long: false
                }, () => {
                    // console.log(resJson.comments)
                })
            })
    }

    fetchShortComments(news_id){
        fetch("https://news-at.zhihu.com/api/4/story/"+news_id+"/short-comments", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    short_comments: resJson.comments,
                    loading_short: false
                }, () => {
                    // console.log(resJson.comments)
                })
            })
    }

    _renderItem = ({item})=>{
        return (
            <View style={styles.comment_box}>
                <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                />
                <View style={styles.content}>
                    <View style={styles.author}>
                        <Text>{item.author}</Text>
                        <View style={styles.like}>
                            <Icon name="thumbs-up" color="#000" size={10} />
                            <Text style={{color: "#000", fontSize: 10}}>{item.likes}</Text>
                        </View>
                    </View>
                    <Text style={styles.conment_text}>{item.content}</Text>
                    <Text style={styles.time}>{Common.getFmtTime("timestamp", item.time, "mm-dd hh:mm")}</Text>
                </View>
            </View>
        )
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const { loading_long, loading_short, short_show } = this.state;
        if(!loading_long && !loading_short){    //加载完成
            console.log()
            return (
                <ScrollView style={styles.container}>
                    <View>
                        <FlatList
                            data={this.state.long_comments}
                            ListEmptyComponent={()=><Text>深度长评虚位以待</Text>}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListHeaderComponent={()=><Text style={[styles.title, styles.title_text]}>{this.state.long_comments.length}条长评</Text>}
                        />
                    </View>

                    <View>
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={()=>{
                                this.setState(prevState=>({
                                    short_show: !prevState.short_show
                                }))
                            }}
                        >
                            <View style={styles.title}>
                                <Text style={styles.title_text}>{this.state.short_comments.length}条短评</Text>
                                <Icon name={`angle-double-${short_show?"up":"down"}`} color="#000" size={30} />
                            </View>
                        </TouchableHighlight>
                        <FlatList
                            style={{display: `${short_show?"flex": "none"}`}}
                            data={this.state.short_comments}
                            ListEmptyComponent={()=><Text>暂无短评</Text>}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}  
                        />
                    </View>
                </ScrollView>
            );
        }else{
            return (
                <Text>加载中，请稍后.....</Text>
            )
        }
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    title_text: {
        fontSize: 16,

    },
    comment_box: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    content: {
        flex: 1,
        paddingLeft: 5
    },
    author: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    like: {
        flexDirection: "row",
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    conment_text: {
        paddingVertical: 10
    },
    time: {
        color: "#666",
        fontSize: 10
    }
});

export default CommentsPage;
