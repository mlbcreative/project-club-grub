import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, Text, Animated, Easing} from 'react-native';
import Button from 'react-native-button';

import Amplify, {Auth} from 'aws-amplify';


class DivotLogoFadeIn extends React.Component {

    
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim,{toValue: 1,duration: 500,delay:250, easing: Easing.inOut(Easing.quad)}).start();                        
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 1],
                })
              },
            ],// Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}


class HomeScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user : {
                username : Auth.user.username,
            },
        }
        
        //Auth.signOut();
        
    }
    
    
    static navigationOptions = {
        title: 'Welcome',
        header : null,
    };
    
    render() {

    

        return (
            <View style={styles.main_container}>

            {/*Background Image*/}
            <View style={styles.bgWrapper}>
                <ImageBackground style={styles.bgImage} source={require('../assets/images/divot-splash3x.png')}></ImageBackground>
            </View>
            {/*.Background Image*/}
            

              {/*LOGO WRAPPER*/}
            <DivotLogoFadeIn style={{flex:2,paddingTop:100,alignItems:'center'}}>
                <Image source={require('../assets/images/divot_type_logo3x.png')} style={styles.logo} resizeMode={'cover'} />
                <Text style={{color:'#8CC63F', fontSize:16, marginTop:10}}>Fill up at the turn</Text>
            </DivotLogoFadeIn>
                
            <View style={{flex: 1, alignItems:'center',}}>
                <Text>
                    Welcome back <Text style={{fontWeight:'bold', fontSize:14}}>{this.state.user.username}</Text>
                </Text>
            </View>


            </View>
            

        );
    }
}


export default HomeScreen;


const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
    bgWrapper : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    bgImage : {
        flex:1,
    },
    logo : {
        width:301,
        height:70,
    },
    signUpBtn : {
        backgroundColor: '#3BA4D5',
        width: 300,
        height:50,
        borderRadius:25,
        paddingTop:10,
    },
    copyright : {
        color: 'white',
        textAlign : 'center',
        padding:10,
    },
    txtInput : {height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:"#fff", marginTop:400}
});


