import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';

import Login from './src/components/Login/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function App() {

  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }
      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);
        snapshot?.forEach((childItem) => {

          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
          setTasks(oldTasks => [...oldTasks, data])

        })

      })

    }
    getUser();
  }, [user])

  //adicionando uma nova tarefa
  function handleAdd() {
    if (newTask === '') {
      return;
    }
    //edição de tarefa
    if (key !== '') {
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key)
          let taskClone = tasks;
          taskClone[taskIndex].nome = newTask

          setTasks([...taskClone])
        })
      setNewTask('')
      Keyboard.dismiss()
      setKey('')
      return;
    }


    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask

    }).then(() => {
      const data = {
        key: chave,
        nome: newTask
      };
      setTasks(oldTasks => [...oldTasks, data])

    })
    setNewTask('')
    Keyboard.dismiss()

  }



  function handleDelete(key) {
    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)
        setTasks(findTasks)
      })
  }
  function handleEdit(data) {
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus()
  }
  function cancelEdit() {
    setNewTask('');
    setKey('');
    Keyboard.dismiss();
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>

      {key.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={cancelEdit}
          >
            <MaterialIcon
              name='cancel'
              size={25}
              color='#ff0000'
            />
          </TouchableOpacity>
          <Text style={{ color: '#FF0000', marginLeft: 15, }}>Você esta editando uma tarefa</Text>
        </View>
      )}


      <View style={styles.containerTask}>


        <TextInput
          style={styles.input}
          placeholder="Quais as notas de hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
          placeholderTextColor={'#121212'}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2f6fc'
  },
  containerTask: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
    color:'#121212'
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  }
})