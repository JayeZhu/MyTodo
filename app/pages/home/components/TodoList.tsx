import { Button, ListItem } from '@rneui/base';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text } from 'react-native';
import { TodoItem } from '../../../interfaces/todo';
import to from 'await-to-js';
import { getList, putTodo } from '../../../services/todo';

interface IProps {};

const TodoList = (props: IProps, ref: any) => {
  const [list, setList] = useState<TodoItem[]>([]);

  const fetchList = async () => {
    const [err, res] = await to(getList({
      pageSize: 10, current: 1, authorId: 'clswywj6w00004w7khey6ep97', tab: 'ongoing'
    }));
    setList(res?.data?.data?.items)
  }

  const changeTodoStatus = async (item: TodoItem) => {
    const data = JSON.stringify({ finishedAt: item?.finishedAt ? null : new Date().toISOString()});
    // const [err, res] = await to(putTodo(item.id, JSON.stringify(data))) // 修改状态
    const [err, res] = await to(fetch(`https://next-app-coral-three.vercel.app/api/todos/${item.id}`, {
      method: 'PUT',
      // body: JSON.stringify({ finishedAt: !item?.finishedAt ? new Date().toISOString() : null }),
      body: data,
    }));
    console.log({ err, res });
    fetchList();
  }

  useImperativeHandle(ref, () => ({
    reload: fetchList
  }))

  useEffect(() => {
    fetchList()
  }, [])

  return <View style={{ flex: 1, width: '100%' }}>
    {
      list?.map(item => {
        return <ListItem style={{ width: '100%' }} key={item?.id}>
          <ListItem.CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={!!item?.finishedAt}
            onPress={() => { changeTodoStatus(item)}}
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item?.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      })
    }
    <Text onPress={() => { fetchList() }} >加载更多</Text>
  </View>;
};

export default forwardRef(TodoList);
