import { useState } from 'react';
import { Provider } from './Context';
export type AppState = {
  todos: {
    id: number;
    listTitle: string;
    todoItems: {
      id: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
    }[];
  }[];
  addTodoList: (newListTitle: string) => void;
  addTodoItem: (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string
  ) => void;
  switchComplete: (listId: number, todoItemId: number) => void;
  deleteList: (listId: number) => void;
  editListTitle: (listId: number, editedTodoTitle: string) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      listTitle: 'title 1',
      todoItems: [
        {
          id: 1,
          itemTitle: 'item 1',
          itemDescription: 'this is description',
          completed: false,
        },
        {
          id: 2,
          itemTitle: 'item 2',
          itemDescription: 'this is description',
          completed: false,
        },
        {
          id: 3,
          itemTitle: 'item 3',
          itemDescription: 'this is description',
          completed: true,
        },
      ],
    },
    {
      id: 2,
      listTitle: 'title 2',
      todoItems: [
        {
          id: 1,
          itemTitle: 'item 1',
          itemDescription: 'this is description 1',
          completed: true,
        },
        {
          id: 2,
          itemTitle: 'item 2',
          itemDescription: 'this is description 2',
          completed: false,
        },
        {
          id: 3,
          itemTitle: 'item 3',
          itemDescription: 'this is description 3',
          completed: true,
        },
      ],
    },
  ]);

  const handleAddTodoList = (newListTitle: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: prevTodos.length + 1,
        listTitle: newListTitle,
        todoItems: [],
      },
    ]);
  };

  const handleAddTodoItem = (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string
  ) => {
    setTodos(prevTodos => {
      return prevTodos.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            todoItems: [
              ...todoList.todoItems,
              {
                id: todoList.todoItems.length,
                itemTitle: newTodoItemTitle,
                itemDescription: newTodoItemDescription,
                completed: false,
              },
            ],
          };
        }
        return todoList;
      });
    });
  };
  const handleItemComplete = (listId: number, todoItemId: number) => {
    setTodos(prevTodos => {
      return prevTodos.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            todoItems: todoList.todoItems.map(todoItem => {
              if (todoItem.id === todoItemId) {
                return {
                  ...todoItem,
                  completed: !todoItem.completed,
                };
              }
              return todoItem;
            }),
          };
        }
        return todoList;
      });
    });
  };

  const handleListDelete = (listId: number) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todoList => {
        return todoList.id !== listId;
      });
    });
  };

  const handleEditTodoTitle = (listId: number, editedTodoTitle: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todoList => {
        if (todoList.id === listId) {
          console.log(todoList);
          return {
            ...todoList,
            listTitle: editedTodoTitle,
          };
          
        }
        return todoList;
      });
    });
  };

  const appState: AppState = {
    todos: todos,
    addTodoList: handleAddTodoList,
    addTodoItem: handleAddTodoItem,
    switchComplete: handleItemComplete,
    deleteList: handleListDelete,
    editListTitle: handleEditTodoTitle,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
