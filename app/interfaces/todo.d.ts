export interface TodoItem {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  finishedAt: Date | null;
  deadline: Date | null;
}