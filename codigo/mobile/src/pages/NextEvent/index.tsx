import React, { useState }  from "react";
import { Text, View , Image} from 'react-native';
import styles from './styles';

import voltarIcons from '../../assets/VoltarCinza.png'
import EventCard from '../../components/EventCard';


function NextEvent(){

    return (
        <View style={styles.background}>
            <Image source={voltarIcons} style={styles.voltar}/>
            <Text style={styles.title}>Proximos eventos</Text>
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
                nameButton={"participar"}
            />

            <EventCard
                key={2}
                title={"Volei de sala"}
                address={"Avenida, numero 30"}
                status={"privado"}
                dateTime="13/04/2020 22:30"
                value={"60,00"}
                totalParticipants={20}
                participants={10}
                nameButton={"participar"}
            />     
            </View>
        </View>
    );
}


export default NextEvent;