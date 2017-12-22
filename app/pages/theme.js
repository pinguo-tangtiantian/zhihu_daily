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
    RefreshControl
} from 'react-native';

import * as actions from '../actions/index';

import ThemeNewsList from '../components/theme_news_list';
import Common from '../static/js/common';

import Icon from 'react-native-vector-icons/FontAwesome';


class ThemePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: ""
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerStyle: navigation.state.params.nightMode?styles.toolbar_n:styles.toolbar,
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
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
    });

    componentWillMount(){
        const theme_id = this.props.navigation.state.params.theme_id;
        this.fetchThemeDetail(theme_id);
        this.props.navigation.setParams({
            nightMode: this.props.nightMode
        })
    }

    fetchThemeDetail(id){
        fetch("https://news-at.zhihu.com/api/4/theme/"+id,{
        })
        .then(res=>res.json())
        .then(resJson=>{
            console.log(resJson)
            this.props.navigation.setParams({
                title: resJson.name
            })
            this.setState({
                theme: resJson
            }, ()=>{
                // console.log(the.state.theme)
            })
        })
        .catch(resJson=>{
            // console.log(resJson)
        })
    }


    render(){
        const { nightMode } = this.props;
        return (
            <ScrollView style={[styles.container, nightMode&&styles.container_n]}>
                <ThemeNewsList
                    data={this.state.theme}
                    navigation = {this.props.navigation}
                    nightMode={this.props.nightMode}
                 />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3"
    },
    container_n: {
        backgroundColor: "#343434"
    },
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
    null
)(ThemePage);

// export default ThemePage;