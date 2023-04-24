export type todoList = {
  id: number;
  listTitle: string;
  topPriority: boolean;
  todoItems: todoItem[];
};

export type todoItem = {
  itemId: number;
  itemTitle: string;
  itemDescription: string;
  completed: boolean;
  deadlineDate: string;
};
export type todoLists = todoList[];
