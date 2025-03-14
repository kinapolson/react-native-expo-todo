import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View, Platform } from "react-native";
import { CheckBox } from "@rneui/themed";


export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Watch Australian Grand Prix for F1", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");


  const toggleTask = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };


  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { key: String(tasks.length + 1), description: newTask, completed: false }]);
      setNewTask("");
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        containerStyle={styles.checkboxContainer}
        checkedIcon={
          <View style={[styles.checkbox, { backgroundColor: "#14213D" }]}>
            <Text style={styles.checkboxText}></Text>
          </View>
        }
        uncheckedIcon={
          <View style={[styles.checkbox, { backgroundColor: "transparent", borderWidth: 1 }]}>
            <Text style={styles.checkboxText}></Text>
          </View>
        }
      />
      <Text style={item.completed ? styles.completedText : styles.taskText}>{item.description}</Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add New Task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? 25 : 0 },
  taskContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  taskText: { fontSize: 18, fontFamily: "Courier" },
  completedText: { fontSize: 18, textDecorationLine: "line-through", fontFamily: "Courier" },
  inputContainer: { flexDirection: "row", padding: 10 },
  input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 10 },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 16,
    color: "white",
  },
});