import React, { useState }  from "react";
import { Text, View , Image} from 'react-native';
import styles from './styles';
import { RectButton ,TextInput} from 'react-native-gesture-handler';

import voltarIcons from '../../assets/VoltarRoxo.png'
import eSort from '../../assets/heartIconRoxo.png'
import EventCard from '../../components/EventCard';
import loteria from '../../assets/loteria.png'

function Sorteio(){

    return (
        <View style={styles.background}>
            <Image source={voltarIcons} style={styles.voltar}/>
            <Text style={styles.title}>Sorteio</Text>
            <View style={styles.container}>
        
                <EventCard
                    key={1}
                    title={"Volei de sala"}
                    address={"Avenida, numero 30"}
                    status={"privado"}
                    dateTime="13/04/2020 22:30"
                    value={"60,00"}
                    totalParticipants={20}
                    participants={10}
                    nameButton={"cancelar"}
                />

                <Text style={styles.label}>Quantidade de grupos</Text>
                <TextInput
                    style={styles.input}
                />
                <RectButton style={styles.button}>
                <Text style={styles.buttonText}>Sortear</Text>
                </RectButton>

                <Image style={styles.img} source={loteria} />
            </View>
            
            <Text style={styles.footer}>
                E-Sort {' '}
                <Image source={eSort} />
            </Text>
        </View>
    );
}


export default Sorteio;