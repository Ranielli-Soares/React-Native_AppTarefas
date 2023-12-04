import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={{paddingRight:10}}
            onPress={ () => deleteItem(data.key)}
            >
                <MaterialIcon
                    name='delete'
                    size={25}
                    color='#FFF'
                />
            </TouchableOpacity>
            <View style={{ paddingRight: 10 }}>
                <TouchableOpacity
                onPress={ () => editItem(data)}
                >
                    <Text style={{ color: '#FFF', paddingRight: 10 }}> {data.nome} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 5,
        padding: 10,
        borderRadius: 4
    }
})