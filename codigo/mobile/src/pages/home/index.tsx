import React from "react";
import { StyleSheet, Text, View , Image} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native'

import homeImg from '../../assets/home_img.png'
import cadastrarImg from '../../assets/arquivo.png'
import loginImg from '../../assets/chave.png'
import heartIcon from '../../assets/heartIcon.png'


function Home(){
    const { navigate } = useNavigation();

    function handleNavigationToRegistrationPage(){
        navigate('Registration');
    }

    function handleNavigationToLoginnPage(){
        navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image source={homeImg} style={styles.banner}/>
            <Text style={styles.title}>
                Seja Bem-vindo!
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigationToRegistrationPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={cadastrarImg} />
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </RectButton>

                <RectButton onPress={handleNavigationToLoginnPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={loginImg} />
                    <Text style={styles.buttonText}>Login</Text>
                </RectButton>
            </View>
            
            <Text style={styles.footer}>
                E-Sort {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}


export default Home;