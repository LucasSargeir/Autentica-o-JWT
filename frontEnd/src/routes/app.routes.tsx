import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import UserPage from '../pages/UserPage';

const AppStack = createStackNavigator();

const AppRoutes = () =>{

    return (
        <AppStack.Navigator headerMode='none' 
                            screenOptions={{ 
                                cardStyle: {
                                    backgroundColor: '#666600'
                                }
                            }}>
            <AppStack.Screen name="Home" component={Home}/>
            <AppStack.Screen name="UserPage" component={UserPage}/>
        </AppStack.Navigator>
    );

};

export default AppRoutes;