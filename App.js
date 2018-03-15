import React from 'react';
import {StackNavigator,} from 'react-navigation';

{/*VIEWS*/}
import HomeScreen from './components/home/Home'


const divotApp = StackNavigator ({
        Home: { screen: HomeScreen },
       },
    { 
        headerMode: 'screen' 
    })
        
export default divotApp;



