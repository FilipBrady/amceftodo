import { useState } from 'react';
import { Provider } from './Context';
export type AppState = {
  todoLists: {
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
  editTodoItem: (
    listId: number,
    itemId: number,
    editedItemTitle: string,
    editedItemDescription: string
  ) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      listTitle: 'title 1',
      todoItems: [
        {
          id: 1,
          itemTitle: 'item 1',
          itemDescription: 'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
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
          itemDescription: 'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
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
    setTodoLists(prevTodoLists => [
      ...prevTodoLists,
      {
        id: prevTodoLists.length + 1,
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
    setTodoLists(prevTodoLists => {
      return prevTodoLists.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            todoItems: [
              ...todoList.todoItems,
              {
                id: todoList.todoItems.length + 1,
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
    setTodoLists(prevTodoLists => {
      return prevTodoLists.map(todoList => {
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
    setTodoLists(prevTodoLists => {
      return prevTodoLists.filter(todoList => {
        return todoList.id !== listId;
      });
    });
  };

  const handleEditTodoTitle = (listId: number, editedTodoTitle: string) => {
    setTodoLists(prevTodoLists => {
      return prevTodoLists.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            listTitle: editedTodoTitle,
          };
        }
        return todoList;
      });
    });
  };

  const handleEditTodoItem = (
    listId: number,
    itemId: number,
    editedItemTitle: string,
    editedItemDescription: string
  ) => {
    setTodoLists(prevTodoLists => {
      return prevTodoLists.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            todoItems: todoList.todoItems.map(todoItem => {
              if (todoItem.id === itemId) {
                return {
                  ...todoItem,
                  itemTitle: editedItemTitle,
                  itemDescription: editedItemDescription,
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

  const appState: AppState = {
    todoLists: todoLists,
    addTodoList: handleAddTodoList,
    addTodoItem: handleAddTodoItem,
    switchComplete: handleItemComplete,
    deleteList: handleListDelete,
    editListTitle: handleEditTodoTitle,
    editTodoItem: handleEditTodoItem,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
