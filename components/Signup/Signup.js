import React, {Component} from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);




class Signup extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            email : '',
            password : '',
            username : '',
            phone_number : '',
            errorMessage:''
        }
        
        this.signUpUser = this.signUpUser.bind(this);
    }
    
    static navigationOptions = {
        title : "Create Account"
    }
    
    signUpUser = () => {
        Auth.signUp(
            {
                username : this.state.username,
                password : this.state.password,
                attributes : {
                    email : this.state.email,
                    phone_number : this.phoneFormat(this.state.phone_number)
                }
            })
        .then(user => {this.props.navigation.navigate('Confirmation', user)})
        .catch(err => { this.setState({errorMessage : err.message}) })
    }
    
    phoneFormat = (phoneNumber) => {
        let formatted = '+1'+phoneNumber.replace(/\D/g,'');
        return formatted;
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
                        <Text style={{color:'red', fontWeight:'bold', marginBottom:15}}>
                            {this.state.errorMessage}
                        </Text>
                        
                        <View style={styles.textInputWrap}>
                            <Icon name="user" size={18} color="#232323" />
                            <TextInput
                                style={styles.textInput}
                                onChangeText = {(username) => this.setState({username})}
                                value = {this.state.username}
                                placeholder = "Username"
                                placeholderTextColor = '#777777'
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({username: '' })}

                            />
                        </View>
                            
                        <View style={styles.textInputWrap}>
                            <Icon name="envelope" size={18} color="#232323" />
                            <TextInput
                                style={styles.textInput}
                                onChangeText = {(email) => this.setState({email})}
                                value = {this.state.email}
                                placeholder = "Email"
                                placeholderTextColor = '#777777'
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({email: '' })}

                            />
                        </View>
                            
                        
                       <View style={styles.textInputWrap}>
                           <Icon name="lock" size={18} color="#232323" /> 
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
                        
                            <View style={styles.textInputWrap}>
                            <Icon name="phone" size={18} color="#232323" />
                            <TextInput
                                style={styles.textInput}
                                onChangeText = {(phone_number) => this.setState({phone_number})}
                                value = {this.state.phone_number}
                                placeholder = "Phone Number"
                                placeholderTextColor = '#777777'
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({phone_number: '' })}

                            />
                        </View>
                            
                          
                        
                    </View>
                            {/*end input wrappers*/}
                        
                    <View style={styles.signInControl}>
                        <TouchableOpacity style={styles.signInBtn} onPress={this.signUpUser}>
                          <Text style={{fontSize:16, color:'white', fontWeight:'bold'}}>CREATE ACCOUNT</Text>  
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
        paddingTop:40,
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
        flex:2,
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
        paddingHorizontal:25,
        paddingBottom:25,
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

export default Signup;