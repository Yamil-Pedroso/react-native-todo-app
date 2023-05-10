import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [todos, setTodos] = useState([])

  const fechtData = async () => {
    const baseUrl = 'http://localhost:8080/todos/1'
    const { data } = await axios.get(baseUrl)
    setTodos(data)
    console.log(data)
  }

  useEffect(() => {
    fechtData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Todo List</Text>
      <View>
        {todos.map((todo: any) => (
          <Text key={todo.id}>{todo.title}</Text>
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
