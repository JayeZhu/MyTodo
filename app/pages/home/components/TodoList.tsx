import { Button, Dialog, ListItem, Card } from '@rneui/themed';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { ScrollView, Text, Alert, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { TodoItem } from '../../../interfaces/todo';
import to from 'await-to-js';
import { deleteTodo, getList, putTodo } from '../../../services/todo';
import dayjs from 'dayjs';
import Detail from './Detail';

interface IProps { };

const TodoList = (props: IProps, ref: any) => {
  const [unChecklist, setUnCheckList] = useState<TodoItem[]>([]);
  const [checkedlist, setCheckedList] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState({ top: false, bottom: false });
  const [checkedPageSize, setCheckedPageSize] = useState(10);
  const [curItem, setCurItem] = useState<TodoItem>();

  const fetchList = async () => {
    setLoading({ ...loading, top: true })
    const params = {
      pageSize: 10, current: 1, authorId: 'clswywj6w00004w7khey6ep97'
    }
    const [err, res] = await to(Promise.all([
      getList({ ...params, tab: 'ongoing' }),
      getList({ ...params, tab: 'finished' })
    ]));
    if (err) {
      Alert.alert('获取列表失败')
    }
    if (res) {
      setUnCheckList(res[0]?.data?.data?.items)
      setCheckedList(res[1]?.data?.data?.items)
    }
    setLoading({ ...loading, top: false })
  }

  const fetchCheckedList = async () => {
    setLoading({ ...loading, bottom: true })
    const params = {
      pageSize: 10, current: 1, authorId: 'clswywj6w00004w7khey6ep97'
    }
    const [err, res] = await to(getList({ ...params, tab: 'finished', pageSize: checkedPageSize + 10 }));
    if (err) {
      Alert.alert('获取列表失败')
    }
    if (res) {
      const { items, total } = res?.data?.data;
      setCheckedList(items)
      if (total > checkedPageSize) setCheckedPageSize(checkedPageSize + 10)
    }
    setLoading({ ...loading, bottom: false })
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

  const deleteItem = async (id: string) => {
    const [err, res] = await to(deleteTodo(id))
    if (err) Alert.alert('删除失败');
    if (res) {
      Alert.alert('删除成功');
      fetchList();
    }
  }

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, contentOffset, layoutMeasurement } = e.nativeEvent;
    const scrollPosition = contentOffset.y;
    // 判断滚动到顶部还是底部
    if (scrollPosition === 0) {
      fetchList();
    } else {
      fetchCheckedList();
    }
  }

  useImperativeHandle(ref, () => ({
    reload: fetchList
  }))

  useEffect(() => {
    fetchList()
  }, [])

  return <ScrollView style={{ flex: 1, width: '100%' }} onMomentumScrollEnd={handleScrollEnd}>
    {loading.top && <Dialog.Loading />}
    <Card>
      <Card.Title>当前</Card.Title>
      {
        unChecklist?.map(item => {
          return <ListItem.Swipeable
            leftContent={() => (
              <Button
                title="Info"
                onPress={() => setCurItem(item)}
                icon={{ name: 'info', color: 'white' }}
                buttonStyle={{ minHeight: '100%' }}
              />
            )}
            key={item?.id}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => deleteItem(item?.id)}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
            )}
          >
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
            <Text>{item?.deadline ? dayjs(item?.deadline).format('MM-DD') : ''}</Text>

          </ListItem.Swipeable>
        })
      }
    </Card>
    <Card>
      <Card.Title>已完成</Card.Title>
      {
        checkedlist?.map(item => {
          return <ListItem.Swipeable
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={() => reset()}
                icon={{ name: 'info', color: 'white' }}
                buttonStyle={{ minHeight: '100%' }}
              />
            )}
            key={item?.id}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => deleteItem(item?.id)}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
            )}
          >
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
            <Text>{item?.deadline ? dayjs(item?.deadline).format('MM-DD') : ''}</Text>

          </ListItem.Swipeable>
        })
      }
    </Card>
    {loading.bottom && <Dialog.Loading />}
    <Detail item={curItem} setItem={setCurItem} />
  </ScrollView>;
};

export default forwardRef(TodoList);
