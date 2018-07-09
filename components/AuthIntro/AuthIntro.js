import React, {Component} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ImageBackground, Animated, Easing} from 'react-native';




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



class AuthIntro extends Component {
    static navigationOptions = { header: null }
    
        
    render() {
        
        const { navigate } = this.props.navigation;
        
        return (
          <View style={styles.main}>
            {/*BACKGROUND*/}
            <View style={styles.bgwrapper}>
                <ImageBackground style={styles.bgImage} source={require('../assets/images/divot-splash3x.png')}></ImageBackground>
            </View>
        
            {/*LOGO WRAPPER*/}
            <DivotLogoFadeIn style={{flex:2,paddingTop:100,alignItems:'center'}}>
                <Image source={require('../assets/images/divot_type_logo3x.png')} style={styles.logo} resizeMode={'cover'} />
                <Text style={{color:'#8CC63F', fontSize:16, marginTop:10}}>Fill up at the turn</Text>
            </DivotLogoFadeIn>
            
            <View style={{flex:1, paddingHorizontal:15, alignItems:'center'}}>
                <TouchableOpacity style={styles.signInBtn} onPress={() => this.props.navigation.navigate('Signin')}>
                    <Text style={{fontSize:18, fontWeight:'bold', color: 'white'}}>LOGIN</Text>
                </TouchableOpacity>
                    
                <TouchableOpacity onPress={ () => navigate('Signup')}>
                      <Text style={{color:'white', fontSize:16}}>Don't have an account'? <Text style={{fontWeight:'bold'}}>Sign up.</Text></Text>  
                </TouchableOpacity>
                
                    
            </View>
            
                
            {/*BEGIN SIGN IN INTERFACE*/}

            
                
          </View>
        );
  }
    
}

const styles = StyleSheet.create({
    
    main : {
        flex:1,
        position: 'relative'
    },
    bgwrapper : {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor : 'white'
    },
    bgImage : {
        flex:1,
    },
    logo : {
        width:301,
        height:70,
    },
    loginView : {
        flex:1,
    },
    signInBtn : {
        backgroundColor : '#3AA4D6',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
        paddingVertical:15,
        borderRadius:5
    }
});

export default AuthIntro;