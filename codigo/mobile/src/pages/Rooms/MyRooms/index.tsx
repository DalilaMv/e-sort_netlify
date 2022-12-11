import React from "react";
import { Image, Text, View} from 'react-native';
import styles from './styles';
import { useNavigation} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import participantsIcons from '../../../assets/participants.png'
import RoomsCard from '../../../components/RoomsCard'


function MyRooms(){

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Minhas Salas</Text>

            <View style={styles.container}>
            <RoomsCard
                 key={1}
                 title={"Volei de sala"}
                 owner={"Luiz mateus"}
                 nameButton={"criar evento"}
                 participants={"10"}
                totalParticipants={"20"}
                routeButton={"FormEvent"}
                />

            </View>
        </View>    

    );
}


export default MyRooms;