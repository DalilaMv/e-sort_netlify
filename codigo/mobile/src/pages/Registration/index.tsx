import React, { useState, useEffect }  from "react";
import { Text, View , Image} from 'react-native';
import styles from './styles';
import { RectButton ,TextInput} from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native'

import voltarIcons from '../../assets/voltar.png'
import heartIcon from '../../assets/heartlconBranco.png'
import api from '../../services/api';

export interface DataRegistryResponse {
    msg: string
    status: string
}

function Registration(){
    const { navigate } = useNavigation();

    function handleNavigationToLoginPage(){
        navigate('Login');
    }

    function handleNavigationToHome(){
        navigate('Home');
    }

    function reload(){
        setEmail("")
        setNome("")
        setSenha("")
        setGenero("")
        setIdade("")
        setLoadging(true)
        useEffect(() => { });
    }

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [genero, setGenero] = useState('');
    const [idade, setIdade] = useState('');
    const [isLoading, setLoadging] = useState(false);
    //API recebe genero como inteiro
    var generoBinario = 1

    async function handleSubmit() {
        if(genero == "feminino" || genero == "f" || genero == "Feminino" || genero == "FEMINIO" || genero == "F"){
            generoBinario = 0
        }

        api.post('/user/save', {
            nome: nome ,
            email: email,
            senha: senha,
            idade: idade,
            genero: generoBinario 
          })
          .then(function (response) {
            console.log(response)
                var data:DataRegistryResponse = response.data;
                if(data.status){
                    console.log("sucesso -----", response);
                    handleNavigationToLoginPage()
                }else{
                    //API retorna 200 em caso de erro
                    console.log("erro -----", response);
                    reload()
                }
          })
          //erro para conectar a API
          .catch(function (error) {
            console.log("error geral");
            console.log(error);
            reload()
          });
    }

    return (
        <View style={styles.container}>
            <RectButton onPress={handleNavigationToHome} style={styles.voltar}>
                <Image source={voltarIcons} />
            </RectButton>

            <Text style={styles.title}>Cadastro</Text>

            <View style={styles.form}>
                <Text style={[styles.label, styles.firstLabel]}>email</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholder="email@gmail.com"
                />
                <Text style={styles.label}>nome</Text>
                <TextInput
                    value={nome}
                    onChangeText={text => setNome(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>senha</Text>
                <TextInput
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={text => setSenha(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>gênero</Text>
                <TextInput
                    value={genero}
                    onChangeText={text => setGenero(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>idade</Text>
                <TextInput
                    value={idade}
                    onChangeText={text => setIdade(text)}
                    keyboardType = 'number-pad'
                    style={styles.input}
                />
                <RectButton onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </RectButton>
                {isLoading && <Text style={styles.TextAlet}>Erro ao cadastrar usuario</Text>}
            </View>

            <Text style={styles.footer}>
                E-Sort {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}


export default Registration;