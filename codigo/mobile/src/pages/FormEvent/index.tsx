import React, { useState }  from "react";
import { Text, View , Image} from 'react-native';
import styles from './styles';
import { RectButton ,TextInput} from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native'

import voltarIcons from '../../assets/voltar.png'
import heartIcon from '../../assets/heartIcon.png'
import api from '../../services/api';

function FormEvent(){
    const { navigate } = useNavigation();

    function handleNavigationToEventsPage(){
        navigate('Events');
    }

    const [title, setTitle] = useState('');
    const [statusEvent, setStatusEvent] = useState('');
    const [Local, setLocal] = useState('');
    const [genero, setGenero] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');

    async function handleSubmit() {
        /*    
        const response = await api.post('/user/save', {
            email,
            senha,
            nome ,
            idade,
            peso,
            genero   
        });
        */
        handleNavigationToEventsPage()
    }

    return (
        <View style={styles.container}>
            <Image source={voltarIcons} style={styles.voltar}/>

            <Text style={styles.title}>Criar evento</Text>

            <View style={styles.form}>
                <Text style={[styles.label, styles.firstLabel]}>titulo</Text>
                <TextInput
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>status</Text>
                <TextInput
                    value={statusEvent}
                    onChangeText={text => setStatusEvent(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>Local</Text>
                <TextInput
                    value={Local}
                    onChangeText={text => setLocal(text)}
                    style={styles.input}
                />
                <Text style={styles.label}>esport</Text>
                <TextInput
                    value={genero}
                    onChangeText={text => setGenero(text)}
                    style={styles.input}
                />
                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>valor</Text>
                        <TextInput
                            value={idade}
                            onChangeText={text => setIdade(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>data</Text>
                        <TextInput
                            value={peso}
                            onChangeText={text => setPeso(text)}
                            style={styles.input}
                        />
                    </View>
                </View>
                <RectButton onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </RectButton>
            </View>

            <Text style={styles.footer}>
                E-Sort {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}


export default FormEvent;