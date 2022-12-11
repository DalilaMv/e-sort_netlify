import React from "react";
import { StyleSheet, Text, View , Image} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native'


import styles from './styles';
import participantsIcons from '../../assets/participants.png'

export interface EventoProps {
    title: string;
    owner: string;
    nameButton: string,
    participants: string,
    totalParticipants: string;
    routeButton: string;
}

const RoomsCard: React.FC<EventoProps> = ({ title, totalParticipants, participants, nameButton, routeButton, owner }) => {

    const navigation = useNavigation();

    const rota = routeButton

    return (
        <RectButton onPress={() => navigation.navigate("Sorteio")} style={styles.card}>
            <View style={styles.left}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.text}>Dono:{owner}</Text>
                </View>

                <RectButton onPress={() => navigation.navigate("NextEvent")} style={styles.buttonLight}>
                    <Text style={styles.buttonText}>proximos eventos</Text>
                </RectButton>
            </View>

            <View style={styles.right}>
                <RectButton  onPress={() => navigation.navigate(rota)} style={styles.button}>
                    <Text style={styles.buttonText}>{nameButton}</Text>
                </RectButton>
                <View style={styles.participantsContainer}>
                    <Image style={styles.icons}  source={participantsIcons}/>
                    <Text style={[styles.text, styles.textStatus]}>{totalParticipants}/{participants}</Text>
                </View>
                
            </View>
        </RectButton>
);
}

export default RoomsCard;