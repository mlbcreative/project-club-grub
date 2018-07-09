import React, {Component} from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);




class Signin extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            email : '',
            password : '',
            errorMessage:''
        }
        
        this.signInUser = this.signInUser.bind(this);
    }
    
    static navigationOptions = {
        title : "Login"
    }
    
    signInUser = () => {
        Auth.signIn(this.state.email, this.state.password)
        .then(user => {this.props.navigation.navigate('AppFlow', user)})
        .catch(err => { this.setState({errorMessage : err.message}) })
    }
        
    render() {
        return (
          <SafeAreaView style={styles.main}>
            
        
            
            
                
            {/*BEGIN SIGN IN INTERFACE*/}
            <KeyboardAvoidingView behavior="padding" style={styles.loginView}>
                
                <ScrollView contentContainerStyle={styles.scrollContentContainer} keyboadShouldPersistTaps='never' scrollEnabled={false}>
                    {/*LOGO WRAPPER*/}
                    <View style={styles.logoWrap}>
                        <Image source={require('../assets/images/divot_type_logo3x.png')} style={styles.logo} resizeMode={'cover'} />
                        <Text style={{color:'#8CC63F', fontSize:16, marginTop:10}}>Fill up at the turn</Text>
                    </View>
                    <View style={styles.loginInput}>
                        <Text style={{color:'red', fontWeight:'bold'}}>
                            {this.state.errorMessage}
                        </Text>
                        
                        
                        <View style={styles.textInputWrap}>
                            <Icon name="user" size={22} color="#232323" />
                            <TextInput
                                style={styles.textInput}
                                onChangeText = {(email) => this.setState({email})}
                                value = {this.state.email}
                                placeholder = "Username"
                                placeholderTextColor = '#777777'
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({email: '' })}

                            />
                        </View>
                        
                       <View style={styles.textInputWrap}>
                           <Icon name="lock" size={22} color="#232323" /> 
                           <TextInput
                                style={styles.textInput}
                                onChangeText = {(password) => this.setState({password})}
                                value = {this.state.password}
                                placeholder = "Password"
                                placeholderTextColor = "#777777"
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({password:""}) }
                                secureTextEntry={true}

                            />
                        </View>
                        
                        <TouchableOpacity style={{marginTop:20}}>
                          <Text style={{color:'black'}}>Forgot Password?</Text>  
                        </TouchableOpacity>   
                        
                    </View>
                        
                    <View style={styles.signInControl}>
                        <TouchableOpacity style={styles.signInBtn} onPress={this.signInUser}>
                          <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>LOGIN</Text>  
                        </TouchableOpacity>
                           
                    </View>
                        
                    
                </ScrollView>
                
            </KeyboardAvoidingView>
                
          </SafeAreaView>
        );
  }
    
}

const styles = StyleSheet.create({
    
    main : {
        flex:1,
        backgroundColor:'#fff'
    },
    bgwrapper : {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor : 'white'
    },
    loginView : {
        flex:1
    },
    scrollContentContainer: {
        flex:1,
        justifyContent:'flex-start'
    },
    logoWrap : {
        flex:1,
        paddingTop:15,
        alignItems:'center'
    },
    logo : {
        width:301,
        height:70,
    },
    loginInput : {
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:25,
        flex:1,
    },
    textInputWrap : {
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCB',
        paddingBottom:10,
        marginBottom:25
    },
    textInput : {
        width:'100%',
        color:'#232323',
        paddingLeft:0,
        paddingRight:15,
        marginLeft:15,
        fontSize:18,
        backgroundColor:'#fff'
    },
    signInControl : {
        flex:1,
        paddingHorizontal:25,
        justifyContent:'flex-end',
        
    },
    signInBtn : {
        backgroundColor : '#3AA4D6',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:5
    }
});

export default Signin;