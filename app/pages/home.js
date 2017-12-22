import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    TouchableHighlight,
    RefreshControl,
    FlatList
} from 'react-native';

import * as actions from '../actions/index';

import BannerNews from '../components/banner_news';
import HomeNewsList from '../components/home_news_list';
import HomeToolBar from '../components/home_tool_bar';

import Common from '../static/js/common';

import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

class HomeContent extends Component {
    constructor(props){
        super(props);

        this.state = {
            hot_news: [],
            all_news: [],
            before_news: [],
            today: "",
            before: ""
        }
    }

    componentDidMount(){
        this.fetchNewsToday();
    }


    _onScroll = (event) =>{
        const _this = this;
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-1){
            const before = this.getBeforeDate(this.state.before);
            
            this.fetchNewsBefore(before);
        }
    }

    /**
     * 获取前一天
     * @param {*} date 当前时间
     */
    getBeforeDate(date) {
        const today = this.state.today;
        let res = "";
        const year = date.substr(0, 4),
            month = date.substr(4, 2),
            day = date.substr(6, 2);
        let time = new Date(year+'/'+month+'/'+day);
        if(date == today && date!= ""){
            res = date;
        }else{
            res = Common.getFmtTime("date", time, 'f3');
        }
        time.setDate(time.getDate() -1);
        this.setState({
            before: Common.getFmtTime("date", time, 'f3')
        });
        return res;
    }

    /**
     * 获取今天之前的某天的新闻
     * @param {string} time 时间，格式：20171102
     */
    fetchNewsBefore(time) {
        fetch("https://news-at.zhihu.com/api/4/news/before/"+time,{
        })
        .then(res=>res.json())
        .then(resJson=>{
            this.setState(prevState => {
                return {
                    all_news: prevState.all_news.concat({time: resJson.date, data: resJson.stories})
                }
            })
        })
        .catch(resJson=>{
            console.log(resJson)
        })
    }

    /**
     * 获得今日相关新闻（包括热门新闻和今日新闻）
     */
    fetchNewsToday() {
        const _this = this;
        fetch("https://news-at.zhihu.com/api/4/news/latest ", {
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            _this.setState(prevState => ({
                all_news: prevState.all_news.concat({time: resJson.date, data: resJson.stories}),
                hot_news: resJson.top_stories,
                today: resJson.date,
                before: resJson.date
            }), () => {
            })
        })
    }

    _onRefresh = () => {
        this.fetchNewsToday();
    }

    render() {
        const dateNow = Common.getFmtDate(new Date());
        const { nightMode } = this.props;
        return (
            <ScrollView
                style={[!nightMode&&styles.container, nightMode&&styles.container_n]}
                onScroll={this._onScroll}
                refreshControl={<RefreshControl refreshing={false} onRefresh={this._onRefresh} />}
            >
                <BannerNews navigation={this.props.navigation} hot_news={this.state.hot_news}/>
                <HomeNewsList
                    navigation = {this.props.navigation}
                    all_news = {this.state.all_news}
                    today = {this.state.today}
                    nightMode = {nightMode}
                />
            </ScrollView>
        )
    }
}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme_list: []
        }
    }

    componentWillMount() {
        this.fetchNewsThemesList();
    }

    /**
    * 获得日报主题列表
    */
    fetchNewsThemesList() {
        const _this = this;
        fetch("https://news-at.zhihu.com/api/4/themes", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            _this.setState(prevState => ({
                theme_list: resJson.others,
            }), () => {
                console.log(this.state.theme_list)
            })
        })
    }

    onMenuClick = ()=>{
        this.drawer.openDrawer();
    }

    

    _renderItem = ({item}) => {
        const { nightMode, navigation } = this.props;
        return (
            <TouchableHighlight
                key={item.id}
                underlayColor="transparent"
                style={{ flex: 1 }}
                onPress={() => { navigation.navigate('Theme', {theme_id: item.id}) }}
            >
                <View key={item.id} style={[styles.theme, nightMode&&styles.theme_n]}>
                    <Text style={[styles.theme_name, nightMode&&styles.theme_name_n]}>{item.name}</Text>
                    <Icon name="plus" color={`${nightMode}`?"#ccc":"#5c5c5c"} size={20} />
                </View>
            </TouchableHighlight>
        );
    }

    _keyExtractor = (item, index) => item.id;

    _renderNavigationView = () => {
        const { theme_list } = this.state;
        const { navigation, nightMode } = this.props;
        const navigationView = (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.user_box, nightMode&&styles.user_box_n]}>
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        underlayColor="transparent"
                        onPress={() => {
                            navigation.navigate('Login')
                        }}>
                        <View style={styles.user_info}>
                            <Icon name="user-circle-o" color="#e5e5e5" size={40} />
                            <Text style={{ color: "#fff", fontSize: 18, marginLeft: 15 }}>请登录</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.user_option}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="star" color="#fff" size={15} />
                            <Text style={{ color: "#fff" }}>我的收藏</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="download" color="#fff" size={15} />
                            <Text style={{ color: "#fff" }}>离线下载</Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight
                    style={{ flex: 1 }}
                    underlayColor="transparent"
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <View style={[styles.to_home, nightMode&&styles.user_box_n]}>
                        <Icon name="home" color="#008bed" size={25} />
                        <Text style={{ color: "#008bed", fontSize: 18, marginLeft: 15 }}>首页</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.theme_list}>
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={()=><View />}
                        data={theme_list}
                    />
                </View>
            </ScrollView>
        );
        return navigationView;
    }

    render() {
        console.log(this.props)
        if(this.state.theme_list[0]){
            return (
                <DrawerLayoutAndroid
                    ref={(drawer) => { this.drawer = drawer; }}
                    drawerWidth={width * 0.8}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this._renderNavigationView}
                >
                    <View style = {{flex: 1}}>
                        <HomeToolBar
                            navigation={this.props.navigation}
                            onMenuClick={this.onMenuClick}
                            nightMode={this.props.nightMode}
                        />
                        <HomeContent
                            navigation={this.props.navigation}
                            nightMode={this.props.nightMode}
                        />
                    </View>
                </DrawerLayoutAndroid>
            );
        }else{
            return (
                <Text></Text>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3"
    },
    container_n: {
        backgroundColor: "#343434"
    },
    news_list: {
        padding: 10
    },
    user_box: {
        flex: 1,
        height: 150,
        backgroundColor: "#008bed",
        padding: 15
    },
    user_box_n: {
        backgroundColor: "#252525",
    },
    user_info: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    user_option: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    to_home: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    to_home_n: {
        backgroundColor: "#2c2c2c",
    },
    theme_list: {
        flex: 6
    },
    theme: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff"
    },
    theme_n: {
        backgroundColor: "#343434"
    },
    theme_name:{
        color: "#000000",
        fontSize: 16
    },
    theme_name_n: {
        color: "#999"
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
)(HomePage);
// export default HomePage;