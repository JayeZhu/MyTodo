import dayjs from "dayjs";
import { TodoItem } from "../../../interfaces/todo";
import { Text, Dialog } from "@rneui/themed";

interface IProps {
  item?: TodoItem
  setItem: (item?: TodoItem) => void
}
export default (props: IProps) => {
  const { item, setItem } = props;

  return <Dialog isVisible={!!item} onPressOut={() => setItem(undefined)}>
    <Dialog.Title title="Todo 详情" />
    <Text>名称：{item?.name}</Text>
    <Text>描述：{item?.description}</Text>
    <Text>创建时间：{item?.createdAt ? dayjs(item?.createdAt).format('YYYY-MM-DD hh:mm:ss') : '--'}</Text>
    <Text>完成时间：{item?.finishedAt ? dayjs(item?.finishedAt).format('YYYY-MM-DD hh:mm:ss') : '--'}</Text>
  </Dialog>
}