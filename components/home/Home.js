import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text} from 'react-native';
import Button from 'react-native-button';
import {StackNavigator,} from 'react-navigation';

import Amplify from 'aws-amplify';
import { Authenitcator, ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignIn, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from '../../aws-exports';


Amplify.configure(aws_exports);

class HomeScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Welcome',
        header : null,
    };
    
    render() {

    const { navigate } = this.props.navigation;

        return (
            <View style={styles.main_container}>

            {/*Background Image*/}
            <View style={styles.bgWrapper}>
            <ImageBackground style={styles.bgImage} source={require('../assets/images/divot-splash3x.png')}></ImageBackground>
            </View>
            {/*.Background Image*/}

            <Image source={require('../assets/images/divot_type_logo3x.png')} style={styles.logo} resizeMode={'cover'} />
            
            <View style={{paddingTop:150}}>
                
                <Button
                    style={{fontSize: 20, color: 'white', fontWeight:'bold'}}
                    styleDisabled={{color: 'red'}}
                    containerStyle={styles.signUpBtn}
                    onPress={() => navigate('SignIn')}>
                    Sign In
                </Button>
                    
                <Text style={styles.copyright}>© 2018 Divot Technologies</Text>
                
            </View>
            {/*.BUTTONS*/}


            </View>
            

        );
    }
}

{/*export default withAuthenticator(HomeScreen);*/}
export default HomeScreen;


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-around'
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
        height:70
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
    }
});


