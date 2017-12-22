import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../static/js/common';

import ShareModal from '../components/share_modal';

const { width, height } = Dimensions.get('window');
import ModalDemo from '../components/test'

class RightTools extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const { navigation, onPress } = this.props;
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                {/* 分享图标，点击弹出选择分享渠道弹窗 */}
                <TouchableHighlight
                    style={{ flex: 1 }}
                    underlayColor="transparent"
                    onPress={navigation.state.params.onModalToggle}>
                    <Icon name="share-alt" size={20} color="#fff" style={{ margin: 15 }} />
                </TouchableHighlight>

                {/* 收藏图标，点击前往登录/收藏 */}
                <TouchableHighlight
                    style={{ flex: 1 }}
                    underlayColor="transparent"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}>
                    <Icon name="star" size={20} color="#fff" style={{ margin: 15 }} />
                </TouchableHighlight>
                
                {/* 评论图标，点击前往查看评论 */}
                <TouchableHighlight
                    style={{ flex: 1 }}
                    underlayColor="transparent"
                    onPress={() => {
                        navigation.navigate('Comments', {total: navigation.state.params.comments, news_id: navigation.state.params.news_id})
                    }}>
                    <Text style={{ flex: 1, flexDirection: "row", padding: 15 }}>
                        <Icon name="commenting" size={20} color="#fff" />
                        <Text style={{ color: "#fff" }}>{navigation.state.params.comments ? navigation.state.params.comments : 0}</Text>
                    </Text>
                </TouchableHighlight>

                {/* 点赞图标，，点击点赞数+1 */}
                <TouchableHighlight
                    style={{ flex: 1 }}
                    underlayColor="transparent"
                    onPress={()=>{}}>
                    <Text style={{ flex: 1, flexDirection: "row", padding: 15 }}>
                        <Icon name="thumbs-up" size={20} color="#fff" style={{ margin: 15 }} />
                        <Text style={{ color: "#fff" }}>{navigation.state.params.like ? navigation.state.params.like : 0}</Text>
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}


class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            extra_data: "",
            modal_show: false
        }
        this.props.navigation.setParams({
            onModalToggle: this.onModalToggle,
            nightMode: this.props.nightMode
        })
    }

    onModalToggle = () => {
        this.setState(prevState=>({
            modal_show: !prevState.modal_show
        }))
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: navigation.state.params.nightMode?styles.toolbar_n:styles.toolbar,
        headerTitleStyle: {
            color: "#fff"
        },
        headerRight: <RightTools navigation={navigation} />,
        headerTintColor: "#fff"
    })

    componentWillMount() {
        const id = this.props.navigation.state.params.news_id;
        this.fetchNewsDetail(id);
        this.fetchNewsExtraInfo(id);
    }

    fetchNewsDetail(news_id) {
        fetch("https://news-at.zhihu.com/api/4/news/" + news_id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    data: resJson
                }, () => {
                    // alert(this.state.body)
                })
            })
    }


    fetchNewsExtraInfo(news_id) {
        const _this = this;
        fetch("https://news-at.zhihu.com/api/4/story-extra/" + news_id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    extra_data: resJson
                }, () => {
                    _this.props.navigation.setParams({
                        comments: resJson.comments,
                        like: resJson.popularity,
                        share_url: resJson.share_url
                    })
                })
            })
    }


    render() {
        const dateNow = Common.getFmtDate(new Date());
        const data = this.state.data;
        if (data != "") {
            const titleBox = '<div style="position:absolute;top:0;left:0;height:200px;overflow:hidden;width:100%;">'
                            +'<div style="position: relative;width:100%;height:200px;">'
                            +'<img src="'+data.image+'" style="position:absolute;top:-100px;width:100%;">'
                            +'<p style="font-size: 18px;color: #fff; position: absolute; bottom:-5px; padding: 0 20px;z-index:100">'+data.title+'</p>'
                            +'<p style="font-size: 10px;color: #fff; position: absolute; bottom:-15px;right: 20px;z-index:100">'+data.image_source+'</p>'
                            +'<div style="background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));background-image: -webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6));width:100%;height:200px;position:absolute;bottom:0;left:0;z-index:10;"></div>'
                            +'</div></div>'
            const HTML = "<html>"
                        + "<head><link rel='stylesheet' href='" + data.css[0] + "' /></head>"
                        + "<body style='position:relative;'>"
                        + (data.image? titleBox: "")
                        + data.body
                        + "</body></html>";
            return (
                <View style={{ flex: 1 }}>
                    <ShareModal
                        onModalToggle={this.onModalToggle}
                        modal_show={this.state.modal_show}
                    />
                    {/* <ModalDemo /> */}
                    <WebView
                        style={styles.webview}
                        source={{ html: HTML }}
                    >
                    </WebView>
                </View>
            );

        } else {
            return (
                <ActivityIndicator size="large" />
            )
        }

    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e1e1e1"
    },
    toolbar: {
        backgroundColor: "#008bed"
    },
    toolbar_n: {
        backgroundColor: "#222",
    },
    title_box: {
        height: 200
    },
    title_text: {
        paddingLeft: 20,
        paddingRight: 20,
        position: "absolute",
        bottom: 15,
        color: "#eee",
        fontFamily: "Microsoft Yahei",
        fontSize: 20
    },
    img_source: {
        position: "absolute",
        bottom: 5,
        right: 20,
        color: "#666",
        fontFamily: "Microsoft Yahei",
        fontSize: 12
    },
    title_img: {
        flex: 1
    },
    webview: {
        flex: 1
    }
});



const mapStateToProps = (state) => {
    return {
        nightMode: state.reducers.setDisplayMode.nightMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    null
)(DetailPage);


// export default DetailPage;
