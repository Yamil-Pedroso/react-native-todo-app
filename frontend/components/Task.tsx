import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface TaskProps {
  id: number
  title: string
  shared_with_id: number
  completed: boolean
  //clearTodo: (id: number) => void
  //toggleTodo: (id: number) => void
}

const taskEmojis = ['👍', '👌', '👀', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫']

const Task = ({
  id,
  title,
  shared_with_id,
  completed,
}: //clearTodo,
//toggleTodo,
TaskProps) => {
  return (
    <TouchableOpacity>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#383839',
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: '#101318',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: '#56636F',
    fontSize: 13,
    fontWeight: 'normal',
    width: '100%',
  },
})

export default Task
