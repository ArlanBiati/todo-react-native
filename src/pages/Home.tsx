import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskProps = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    const findTask = tasks.find(task => task.title === newTaskTitle)

    if (findTask) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [
          {
            text: "Ok",
            style: "cancel"
          }
        ]
      )
    }
      setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {

    const updateTasks = tasks.map(task => ({ ...task })); // crio um novo array onde irei atualizar os dados

    const foundItem = updateTasks.find(item => item.id === id); // procuro o item que tem os IDs correspondentes

    if(!foundItem) return;
    foundItem.done = !foundItem.done // seta true ou false
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {

    const updateTasks = tasks.map(task => ({ ...task })); // crio um novo array onde irei atualizar os dados

    const foundItem = updateTasks.find(item => item.id === taskId); // procuro o item que tem os IDs correspondentes

    if(!foundItem) return;
    foundItem.title = taskNewTitle // seta true ou false
    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})