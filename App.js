import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Modal, Button, TextInput, Dimensions } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons'; 
import Checkbox from 'expo-checkbox';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState(null);
  const [taskList, setTaskList] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>😎 To-Do List 📝</Text>
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Entypo name="plus" size={30} color="white"/> 
      </TouchableOpacity>
      {
        taskList.length != 0 
        ?
        taskList.map((task, index) => {
          return (
          <View style={[styles.taskView, {backgroundColor: task.value ? '#27292b' : 'transparent'}]} key={index}>
            <View style={styles.taskInnerView}>
              <Checkbox style={styles.checkbox} value={task.value} onValueChange={() => {
                let newTaskList = [...taskList];
                newTaskList[index] = {text: task.text, value: !task.value};
                setTaskList(newTaskList);
              }} />
              <Text style={[styles.taskText, {color: task.value ? '#49484b' : 'white'}]}>{task.text}</Text>
              {
                !task.value 
                ? 
                <Text style={styles.highlightText}>Today</Text>
                :
                null
              }
            </View>
            <MaterialIcons name="delete-outline" size={24} color={task.value ? '#49484b' : 'gray'} />
          </View>
          )
        })
        : 
        <Text style={{color: 'lightgray', marginHorizontal: 20}}>Add new tasks</Text>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.subtitle}>Enter a task</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setTask(text)}
                value={task}
              />
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.addButton} onPress={() => {
                  let newTaskList = [...taskList];
                  newTaskList.push({text: task, value: false});
                  setTaskList(newTaskList);
                  setModalVisible(false);
                }}>
                  <Text style={styles.subtitle}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.subtitle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2123',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalInnerContainer: {
    backgroundColor: '#1b1b1c',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    padding: 15,
    backgroundColor: '#2b2c2e',
    color: 'white',
    marginVertical: 20,
    minWidth: Dimensions.get("screen").width * 0.8,
    borderRadius: 15
  },
  title:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40,
    marginHorizontal: 20
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4983ef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2b2c2e', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5
  },
  subtitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 5,
  },
  taskView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  taskInnerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    marginRight: 10,
  },
  highlightText: {
    color: '#08f26e',
    backgroundColor: 'rgba(7, 218, 99, 0.1)',
    padding: 2,
    fontWeight: '600'
  },
  floatingButton: {
    backgroundColor: '#4983ef',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30
  }
});
