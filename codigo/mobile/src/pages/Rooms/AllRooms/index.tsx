import React, { useEffect, useState } from "react";
import { Image, Text, View } from 'react-native';
import styles from './styles';


import AllRoomsCard from '../../../components/AllRoomsCard'
import api from '../../../services/api';
import { Room } from '../Room'

export interface ResponseRoom {
    room: Array<Room>
}

function AllRooms() {

    const [rooms, setRoom] = useState(Array<Room>);


    React.useEffect(() => {
        api.get('/room').then(response => {
            const responseRoom: ResponseRoom = response.data
            let room: Array<Room> = responseRoom.room
            setRoom(room)
        })
    }, []);


    return (
        <View style={styles.background}>
            <Text style={styles.title}>Todas as Salas</Text>

            <View style={styles.container}>

                {rooms.slice(0, 2).map(room =>
                    <AllRoomsCard
                        key={room.id}
                        title={room.nome}
                        cidade={room.cidade}
                        participants={"0"}
                        totalParticipants={room.numParticipantes}
                    />
                )}

            </View>
        </View>

    );
}


export default AllRooms;