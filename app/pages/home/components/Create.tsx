import React from "react";
import { BottomSheet, Card, FAB, Icon, Input } from '@rneui/themed';
import { Alert, StyleSheet, View } from "react-native";
import to from "await-to-js";
import { createTodo } from "../../../services/todo";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface IProps {
  onCreateSuccess: () => void;
}

const DEFAULT_FORM_DATA = {
  name: '',
  description: '',
  authorId: 'clswywj6w00004w7khey6ep97',
  deadline: undefined,
}

const Create = (props: IProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);

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
      setFormData(DEFAULT_FORM_DATA);
    }
  }

  const selectDeadline = async () => {
    DateTimePickerAndroid.open({
      value: formData.deadline ? new Date(formData.deadline) : new Date(),
      onChange: (event, selectedDate) => {
        setFormData({ ...formData, deadline: selectedDate?.toISOString() })
      },
      mode: 'time',
      is24Hour: true,
    })
  }

  return <>
    <FAB
      onPress={() => setIsVisible(true)}
      placement="right"
      icon={{ name: 'add', color: 'white' }}
      color="green"
    />
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Card>
        <Input placeholder="事项" value={formData.name} onChangeText={(value) => changeFormData('name', value)} />
        <Input placeholder="描述" value={formData.description} onChangeText={(value) => changeFormData('description', value)} />
        <Card.Divider />
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
          <Icon onPress={selectDeadline} name="calendar-sharp" type="ionicon" />
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