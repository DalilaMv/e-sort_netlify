import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './styles';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

import voltarIcons from '../../assets/voltar.png'
import heartIcon from '../../assets/heartIcon.png'
import api from '../../services/api';

export interface DataResponse {
    email: string
    id: number
    nome: string
}

function Login() {

    const { navigate } = useNavigation();


    function handleNavigationToEventsPage(data: DataResponse) {
        navigate('Events', {
            userId: data.id,
            userName: data.nome
        })
    }

    function handleNavigationToHome() {
        navigate('Home');
    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setLoadging] = useState(false);

    function reload() {
        setEmail("")
        setSenha("")
        setLoadging(true)
        useEffect(() => { });
    }

    async function handleSubmit() {
        api.post('/users/check', {
            email: email,
            senha: senha
        })
            .then(function (response) {
                var data: DataResponse = response.data[0];
                if (response.data.length > 0) {
                    handleNavigationToEventsPage(data)
                } else {
                    //API retorna 200 em caso de erro
                    console.log("erro -----", response);
                    reload()
                }
            })
            //erro para conectar a API
            .catch(function (error) {
                console.log(error);
                reload()
            });
    }

    return (
        <View style={styles.container}>
            <RectButton onPress={handleNavigationToHome} style={styles.voltar}>
                <Image source={voltarIcons} />
            </RectButton>

            <Text style={styles.title}>Login</Text>

            <View style={styles.form}>
                <Text style={[styles.label, styles.firstLabel]}>email</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholder="email@gmail.com"
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    value={senha}
                    onChangeText={text => setSenha(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <RectButton onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </RectButton>
                {isLoading && <Text style={styles.TextAlet}>Usuário inválido, tente novamente</Text>}
            </View>

            <Text style={styles.footer}>
                E-Sort {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}


export default Login;