import React from "react";
import { Image, Text, View} from 'react-native';
import styles from './styles';
import { useNavigation} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import participantsIcons from '../../../assets/participants.png'
import RoomsCard from '../../../components/RoomsCard'


function MemberRooms(){

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Salas que sou membro</Text>

            <View style={styles.container}>
                <RoomsCard
                 key={1}
                 title={"Volei de sala"}
                 owner={"Luiz mateus"}
                 nameButton={"sair"}
                 participants={"10"}
                totalParticipants={"20"}
                routeButton={"Membro"}
                />

                <RoomsCard
                 key={2}
                 title={"Volei de sala"}
                 owner={"Luiz mateus"}
                 nameButton={"sair"}
                 participants={"10"}
                totalParticipants={"20"}
                routeButton={"Membro"}
                />

            </View>
        </View>    

    );
}


export default MemberRooms;