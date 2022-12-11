import React, { useState, useEffect } from "react";
import { Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


import styles from './styles';
import EventCard from '../../components/EventCard';
import SimpleModal from '../../components/SimpleModal';
import sairIcon from '../../assets/sair.png'
import api from '../../services/api';
import Event from '../Events';


type DataResponse = {
    userId: number
    userName: string
}




function Salas() {
    const { navigate } = useNavigation();
    const route = useRoute();

    const { userId, userName }: DataResponse = route.params
    const [events, setEvents] = useState(Array<Event>);


    function logout() {
        navigate('Home');
    }

    useEffect(() => {
        api.get(`/events/checkRoom/${userId}`).then(response => {
            const eventResponse: Array<Event> = response.data;

            setEvents(eventResponse)
        })
    }, []);


    return (
        <>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>Olá,</Text>
                    <Text style={styles.subTitle}>{userName}</Text>
                </View>

                <View style={styles.menuContainer}>
                    <View>
                        <SimpleModal></SimpleModal>
                    </View>

                    <RectButton onPress={logout}>
                        <Image source={sairIcon} />
                    </RectButton>
                </View>
            </View>


            <View style={styles.container}>
                <View style={styles.eventsContainer}>
                    <Text style={styles.titleEventos}>Proximos eventos</Text>
                    {events.slice(0, 2).map(event =>
                        <EventCard
                            key={event.id}
                            title={event.nome}
                            address={event.local}
                            status={event.status}
                            dateTime={event.data}
                            value={event.valor}
                            totalParticipants={event.quantidadeMax}
                            participants={event.quantidade}
                            nameButton={"cancelar"}
                        />
                    )}
                </View>
            </View>
        </>
    );
}


export default Salas;