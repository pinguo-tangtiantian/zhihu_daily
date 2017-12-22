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

import Common from '../static/js/common';
const { width, height } = Dimensions.get('window');

class EditorsPage extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: "主编",
        headerStyle: {
            backgroundColor: "#008bed",
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    });

    _renderItem = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor="transparent"
                style={{flex:1}}
                onPress={()=>{
                    this.props.navigation.navigate('Profile', { id: item.id })
                }}
            >
                <View style={styles.editor}>
                    <Image
                        source={{uri: item.avatar}}
                        style={styles.avator}
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.desc}>{item.bio}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _keyExtractor = (item, index) => item.id;

    render(){
        const { editors } = this.props.navigation.state.params;
        // alert(JSON.stringify(this.props))
        if(editors){
            return (
                <View style={styles.container}>
                    <FlatList
                        data={editors}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>
            )
        }else{
            return <ActivityIndicator size="large" />
        }
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    editor: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    avator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15
    },
    name: {
        fontSize: 18,
        color: "#000",
        marginBottom: 10
    },
    desc: {
        fontSize: 12,
        color: "#666"
    }
});

export default EditorsPage;