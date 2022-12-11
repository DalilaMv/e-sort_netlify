import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { Image} from 'react-native';
import sinoIcon from '../../assets/sino.png'

import styles from './styles';


const SimpleModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.tile}>Notificações</Text>

            
            <View style={styles.card}>
              <Text style={styles.text}>Ana Luiza</Text>
              <Text style={styles.text}>Sala de jogos</Text>
              <View  style={styles.buttonContainer}>
                  <Pressable
                      style={[styles.button, styles.approveButton]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>aprovar</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text style={styles.textStyle}>rejeitar</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.text}>Ana Luiza</Text>
              <Text style={styles.text}>Sala de jogos</Text>
              <View  style={styles.buttonContainer}>
                  <Pressable
                      style={[styles.button, styles.approveButton]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>aprovar</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text style={styles.textStyle}>rejeitar</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.text}>Ana Luiza</Text>
              <Text style={styles.text}>Sala de jogos</Text>
              <View  style={styles.buttonContainer}>
                  <Pressable
                      style={[styles.button, styles.approveButton]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>aprovar</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text style={styles.textStyle}>rejeitar</Text>
                </Pressable>
              </View>
            </View>

           
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
         <Image source={sinoIcon} style={styles.sinoIcon}/>
      </Pressable>
    </View>
  );
};

export default SimpleModal;