import React, { useState } from "react";
import { BottomSheet, Button, Icon, Text } from '@rneui/themed';
import { Alert, StyleSheet, View } from "react-native";
import { Card, Input } from "@rneui/base";
import to from "await-to-js";
import { createTodo } from "../../../services/todo";

interface IProps {
  onCreateSuccess: () => void;
}

const Create = (props: IProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    authorId: 'clswywj6w00004w7khey6ep97'
  });

  const changeFormData = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const submitForm = async () => {
    const [err, res] = await to(createTodo(JSON.stringify(formData)));
    if (err) Alert.alert('创建事项失败')
    if (res) {
      Alert.alert('创建成功');
      props.onCreateSuccess();
    }
  }

  return <>
    <Button
      title="添加事项"
      onPress={() => setIsVisible(true)}
      buttonStyle={styles.button}
    />
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Card>
        <Input placeholder="事项" value={formData.name} onChangeText={(value) => changeFormData('name', value)} />
        <Input placeholder="描述" value={formData.description} onChangeText={(value) => changeFormData('description', value)} />
        <Card.Divider />
        <Text>1234551</Text>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
          <Icon name="calendar-sharp" type="ionicon" />
          <Icon name="save" color="green" onPress={submitForm} />
        </View>
      </Card>
    </BottomSheet>
  </>
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default Create;