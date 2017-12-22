import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import Common from '../static/js/common';

import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

class HomeToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOn: false
        }
        // this.drawer = this.props.drawer;
    }

    onActionSelected = (index) => {
        if (index == 0) {
            this.props.navigation.navigate('Login');
        }else if(index == 1){
            // console.log(this.props.actions)
            const { nightMode } = this.props;
            if(nightMode){
                this.props.actions.setDisplayMode("daytime");
            }else{
                this.props.actions.setDisplayMode("night");
            }
        }
    }

    openDrawer = () => {
        this.props.onMenuClick();
    }

    render() {
        const { nightMode } = this.props;
        return (
            <Icon.ToolbarAndroid
                actions={[
                    {
                        title: 'msg',
                        show: 'always',
                        iconName: "bell",
                    }, {
                        title: nightMode?'日间模式':"夜间模式"
                    }, {
                        title: '设置选项'
                    }
                ]}
                style={[!nightMode&&styles.toolbar, nightMode&&styles.toolbar_n]}
                navIconName="navicon"
                overflowIconName="ellipsis-v"
                titleColor="#fff"
                onIconClicked={this.openDrawer}
                onActionSelected={this.onActionSelected}
                title="首页"/>
            );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#008bed',
        height: 56
    },
    toolbar_n: {
        backgroundColor: '#222',
        height: 56
    }
})


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
    mapDispatchToProps
)(HomeToolBar);
// export default HomeToolBar;