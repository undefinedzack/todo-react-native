import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.item}>
            {taskItems.map((task, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={task} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {},
});
