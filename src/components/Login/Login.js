import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import firebase from "../../services/firebaseConnection.js"

export default function Login({ changeStatus }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginAtv, setLoginAtv] = useState('login')

  function handleLogin() {

    if (loginAtv === 'login') {
      // aqui efetuamos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
          setEmail('')
          setPassword('')
        })
        .catch((error) => {
          alert('E-mail ou senha inválidos!')
          setEmail('')
          setPassword('')
          return;
        })
    } else {
      //aqui cadastramos o user
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
          setEmail('')
          setPassword('')
        })
        .catch((error) => {
          alert('Verifique o e-mail e senha digitados!')
          setEmail('')
          setPassword('')
          return;
        })
    }


  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, {color: loginAtv === 'login' ? '#3ea6b7' : '#797979'}]}>Work Notes</Text>
      <MaterialIcon
        name='description'
        size={80}
        color={loginAtv === 'login' ? '#3ea6b7' : '#797979'}
      />
      <TextInput
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Insira seu e-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={'#121212'}
      />
      <TextInput
        style={styles.input}
        placeholder="****************"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        placeholderTextColor={'#121212'}
      />
      <TouchableOpacity
        style={[styles.areaBtn, { backgroundColor: loginAtv === 'login' ? '#3ea6f2' : '#141414' }]}
        onPress={handleLogin}
      >
        <Text style={styles.txtBtn}>
          {loginAtv === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setLoginAtv(loginAtv => loginAtv === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={{ textAlign: 'center', color:'#000' }}>
          {loginAtv === 'login' ? 'Criar uma conta' : 'Já possuo cadastro'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2f6fc'
  },
  title: {
    fontSize:25,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: 350,
    borderWidth: 0.5,
    borderRadius: 7,
    margin: 5,
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#141414',
    color:'#000'
  },
  areaBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    width: 350,
    borderRadius: 7,

    margin: 3
  },
  txtBtn: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFF'
  }
})
