import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'


import participantsIcons from '../../assets/participants.png'

export interface EventoProps {
    key: number
    title: string;
    cidade: string;
    participants: string,
    totalParticipants: number;
}

const AllRoomsCard: React.FC<EventoProps> = ({ title, totalParticipants, participants, cidade }) => {
    const navigation = useNavigation();


    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>Cidade: {cidade}</Text>
            </View>

            <View style={styles.right}>
                <RectButton onPress={() => navigation.navigate("Membro")} style={styles.button}>
                    <Text style={styles.buttonText}>ingressar</Text>
                </RectButton>
                <View style={styles.participantsContainer}>
                    <Image style={styles.icons} source={participantsIcons} />
                    <Text style={[styles.text, styles.textStatus]}>{participants}/{totalParticipants}</Text>
                </View>

            </View>
        </View>
    );
}

export default AllRoomsCard;