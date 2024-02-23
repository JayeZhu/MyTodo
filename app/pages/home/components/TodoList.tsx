import { Button, ListItem } from '@rneui/base';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Alert } from 'react-native';
import { TodoItem } from '../../../interfaces/todo';
import to from 'await-to-js';
import { deleteTodo, getList, putTodo } from '../../../services/todo';
import dayjs from 'dayjs';

interface IProps { };

const TodoList = (props: IProps, ref: any) => {
  const [list, setList] = useState<TodoItem[]>([]);

  const fetchList = async () => {
    const [err, res] = await to(getList({
      pageSize: 10, current: 1, authorId: 'clswywj6w00004w7khey6ep97', tab: 'ongoing'
    }));
    setList(res?.data?.data?.items)
  }

  const changeTodoStatus = async (item: TodoItem) => {
    const data = { finishedAt: item?.finishedAt ? null : dayjs().toISOString() }
    const [err, res] = await to(putTodo(item.id, data)) // 修改状态
    if (err) Alert.alert('更新失败');
    if (res) {
      Alert.alert('更新成功');
      fetchList();
    }
  }

  const deleteItem = async () => {
    const [err, res] = await to(deleteTodo(list[0]?.id))
    if (err) Alert.alert('删除失败');
    if (res) {
      Alert.alert('删除成功');
      fetchList();
    }
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
            onPress={() => { changeTodoStatus(item) }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item?.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      })
    }
    <Text onPress={() => deleteItem()}>删除</Text>
    <Text onPress={() => { fetchList() }} >加载更多</Text>
  </View>;
};

export default forwardRef(TodoList);
