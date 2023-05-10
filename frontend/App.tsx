import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Task from './components/Task'

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
      <SafeAreaView>
        <FlatList
          data={todos}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <Task {...item} />}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
  },
  contentContainerStyle: {
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 15,
  },
})
