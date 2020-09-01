import React, { createContext, useState, useEffect, useContext } from 'react'
import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User{
    nome:string;
    email:string;
    sexo: string;
    data_nasc: string;
    id: number;
}

interface Validacao{
    email:string;
    senha:string;
}

interface AuthContextData{
    signed: boolean;
    user: User| null;
    signIn(props: Validacao): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) =>{
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        async function loadStorageData(){

            const storagedUser = await AsyncStorage.getItem('@FrontEnd:user');
            const storagedToken = await AsyncStorage.getItem('@FrontEnd:token');

            if( storagedUser && storagedToken){
                api.defaults.headers.authorization = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));

            }

        }

        loadStorageData();
    },[])

    async function signIn(props: Validacao){

        const response = await auth.signIn(props);

        setUser(response.user);

        api.defaults.headers.authorization = `Bearer ${response.token}`

        await AsyncStorage.multiSet([['@FrontEnd:user', JSON.stringify(response.user)],
                                    ['@FrontEnd:token', response.token]])

    }

    async function signOut(){

        AsyncStorage.multiRemove(['@FrontEnd:user','@FrontEnd:token'])
        .then(()=>{
            setUser(null);
        })

    }


    return(
        <AuthContext.Provider value={{signed: !!user, user, signOut, signIn}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth(){

    const context = useContext(AuthContext);

    return context;

};