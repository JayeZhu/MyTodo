import React, { useRef } from 'react';
import { View } from 'react-native';
import TodoList from './components/TodoList';
import Create from './components/Create';

const Home = () => {
  const listRef = useRef<any>();
  const reloadTodoList = () => {
    listRef.current?.reload();
  }

  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <TodoList ref={listRef}></TodoList>
    <Create onCreateSuccess={reloadTodoList}/>
  </View>;
};

export default Home;
