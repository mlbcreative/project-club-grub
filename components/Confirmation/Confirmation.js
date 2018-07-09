import React, {Component} from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);


class Confirmation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username : this.props.navigation.state.params.user.username,
            confirmation_code : '',
            errorMessage : '',
        }
        this.confirmUser = this.confirmUser.bind(this);
    }
    
    static navigationOptions = {
        title : "Confirm Account"
    }
    
    confirmUser = () => {
        Auth.confirmSignUp(this.state.username, this.state.confirmation_code)
        .then( () => {this.props.navigation.navigate('Signin')} )
        .catch( err => { this.setState({errorMessage : err.message}) } );
    }
    
    render(){
        return(
        
            <SafeAreaView style={styles.mainContainer}>
                
                <KeyboardAvoidingView behavior="padding" style={styles.loginView}>
                    
                    <ScrollView contentContainerStyle={styles.scrollContentContainer} keyboadShouldPersistTaps='never' scrollEnabled={false}>
                        
                        <View style={styles.confirmationCode}>
                            
                            <Text style={{fontSize:22, fontWeight:'bold', marginBottom:15}}>
                                Verification Code
                            </Text>
            
                            <Text style={{fontSize:16, textAlign:'center', paddingHorizontal:30}}>
                                Yay! You're almost in! Please enter the verification code we sent you via text message.
                            </Text>
            
                            <Text style={{color:'red', fontWeight:'bold', marginBottom:15}}>
                                {this.state.errorMessage}
                            </Text>
            
                            <TextInput
                                style={styles.textInput}
                                onChangeText = {(confirmation_code) => this.setState({confirmation_code})}
                                value = {this.state.confirmation_code}
                                placeholder = "CONFIRMATION CODE"
                                placeholderTextColor = "#777777"
                                autoCapitalize = "none"
                                onFocus = { () => this.setState({confirmation_code:""}) }

                            />
                        </View>
            
                        <View style={styles.confirmationSubmit}>
                            <TouchableOpacity style={styles.confirmBtn} onPress={this.confirmUser}>
                                <Text style={{fontSize:16, color:'white', fontWeight:'bold'}}>CONFIRM</Text>  
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.resendCode}>
                               <Text>Didn't get the code? <Text style={{fontWeight:'bold'}}>Resend code.</Text></Text>
                            </TouchableOpacity>
                                
                        </View>
            
                    </ScrollView>
            
                </KeyboardAvoidingView>
            
            </SafeAreaView>
            
        )
    }
    
}

const styles = StyleSheet.create({
    mainContainer : {
        flex:1,
        backgroundColor : '#ffffff',
    },
    loginView : {
        flex:1
    },
    scrollContentContainer: {
        flex:1,
        justifyContent:'flex-start'
    },
    confirmationCode : {
        flex : 3,
        backgroundColor : '#fff',
        justifyContent : 'center',
        alignItems : 'center'
    },
    textInput : {
        width:'100%',
        color:'#232323',
        paddingLeft:0,
        fontSize:18,
        backgroundColor:'#fff',
        height: 40,
        width:200,
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCB',
    },
    confirmationSubmit : {
        flex:1,
        justifyContent :  'flex-end',
        alignItems:'center',
        paddingHorizontal:25,
        paddingBottom:25,
    },
    confirmBtn : {
        backgroundColor : '#3AA4D6',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:5
    },
    resendCode : {
        marginTop:15
    }
})

export default Confirmation;