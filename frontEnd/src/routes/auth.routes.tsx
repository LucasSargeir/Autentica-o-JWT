import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Login from '../pages/Login';

const AuthStack = createStackNavigator();

const AuthRoutes = () =>{

    return (
        <AuthStack.Navigator headerMode='none' 
                            screenOptions={{ 
                                cardStyle: {
                                    backgroundColor: '#666600'
                                }
                            }}>
            <AuthStack.Screen name="Home" component={Home}/>
            <AuthStack.Screen name="UserPage" component={Login}/>
        </AuthStack.Navigator>
    );

};

export default AuthRoutes;