import React, {Component} from 'react';
import {ActivityIndicator, View, ImageBackground, StyleSheet} from 'react-native';
import {SwitchNavigator, StackNavigator} from 'react-navigation';

import Amplify, {Auth} from 'aws-amplify';


class AuthLoading extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            authState : '',
        }
        
        //Auth.signOut();
        
        Auth.currentAuthenticatedUser()
        .then(user => {this.props.navigation.navigate('Home', {user:user})})
        .catch(err => this.props.navigation.navigate('AuthFlow'));
        
    }
    
    
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', position: 'relative'}}>
                 {/*Background Image*/}
                    <View style={styles.bgWrapper}>
                        <ImageBackground style={styles.bgImage} source={require('../assets/images/divot-splash3x.png')}></ImageBackground>
                    </View>
                    {/*.Background Image*/}

                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#ffffff" />    
                </View>
            </View>
        )
    }
    
    
}

const styles = StyleSheet.create({
    
    bgWrapper : {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom:0,
        right:0
    },
    bgImage : {
        flex:1
    }
})

export default AuthLoading;