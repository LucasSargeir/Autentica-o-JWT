import React from 'react';
import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Routes: React.FC = () =>{

    const { signed } = useAuth();
    
        
    return (signed === true)?<AppRoutes/>:<AuthRoutes/>


};

export default Routes;