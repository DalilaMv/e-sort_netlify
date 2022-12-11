import React from "react";
import { StyleSheet, Text, View , Image} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import participantsIcons from '../../assets/participants.png'

export interface EventoProps {
    title: string;
    address: string;
    status: string
    totalParticipants: number,
    participants: number,
    value: string;
    dateTime: string;
    nameButton: string
}


const EventCard: React.FC<EventoProps> = ({ title,  address, status, totalParticipants, participants, dateTime, value , nameButton}) => {
    return (
        <RectButton style={styles.container}>
            <View style={styles.left}>

                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{address}</Text>
                <Text style={[styles.text, styles.textStatus]}>{status}</Text>

                <RectButton style={styles.button}>
                    <Text style={styles.buttonText}>{nameButton}</Text>
                </RectButton>
            </View>

            <View style={styles.right}>
                <View style={styles.participantsContainer}>
                    <Image style={styles.icons}  source={participantsIcons}/>
                    <Text style={[styles.text, styles.textStatus]}>{totalParticipants}/{participants}</Text>
                </View>
                <Text  style={[styles.text, styles.textBold]}>R$ {value}</Text>
            </View>
        </RectButton>
    );
}

export default EventCard;