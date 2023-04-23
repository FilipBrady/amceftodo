import { useState } from 'react';
import { Provider } from './Context';
import axios from 'axios';
export type AppState = {
  todoLists: {
    id: number;
    listTitle: string;
    topPriority: boolean;
    todoItems: {
      itemId: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
      deadlineDate: string;
      deadlineTime: string;
    }[];
  }[];
  addTodoList: (
    newListTitle: string,
    newItemTitle: string,
    newDescriptionTitle: string,
    deadlineDate: string,
    deadlineTime: string
  ) => void;
  addTodoItem: (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string,
    deadlineDate: string,
    deadlineTime: string
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
  changeListPriority: (listId: number) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const axios = require('axios');
  axios
    .get('https://643ffbecb9e6d064be04a18a.mockapi.io/todoList')
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((error: any) => {
      console.log(error);
    });

  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      listTitle: 'title 1',
      topPriority: false,
      todoItems: [
        {
          itemId: 1,
          itemTitle: 'item 1',
          itemDescription:
            'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
          completed: false,
          deadlineDate: '2023-04-23',
          deadlineTime: '22:15',
        },
        {
          itemId: 2,
          itemTitle: 'item 2',
          itemDescription: 'this is description',
          completed: false,
          deadlineDate: '2023-04-24',
          deadlineTime: '20:10',
        },
        {
          itemId: 3,
          itemTitle: 'item 3',
          itemDescription: 'this is description',
          completed: true,
          deadlineDate: '2023-04-25',
          deadlineTime: '8:23',
        },
      ],
    },
    {
      id: 2,
      listTitle: 'title 2',
      topPriority: true,
      todoItems: [
        {
          itemId: 1,
          itemTitle: 'item 1',
          itemDescription:
            'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
          completed: true,
          deadlineDate: '2023-04-26',
          deadlineTime: '18:23',
        },
        {
          itemId: 2,
          itemTitle: 'item 2',
          itemDescription: 'this is description 2',
          completed: false,
          deadlineDate: '2023-04-23',
          deadlineTime: '12:53',
        },
        {
          itemId: 3,
          itemTitle: 'item 3',
          itemDescription: 'this is description 3',
          completed: true,
          deadlineDate: '2023-04-25',
          deadlineTime: '18:45',
        },
      ],
    },
  ]);

  const handleAddTodoList = (
    newListTitle: string,
    newItemTitle: string,
    newDescriptionTitle: string,
    deadlineDate: string,
    deadlineTime: string
  ) => {
    const newTodoItem = {
      itemId: 1,
      itemTitle: newItemTitle,
      itemDescription: newDescriptionTitle,
      completed: false,
      deadlineDate: deadlineDate,
      deadlineTime: deadlineTime,
    };
    setTodoLists(prevTodoLists => [
      ...prevTodoLists,
      {
        id: prevTodoLists.length + 1,
        listTitle: newListTitle,
        topPriority: false,
        todoItems: [newTodoItem],
      },
    ]);
  };

  const handleAddTodoItem = (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string,
    deadlineDate: string,
    deadlineTime: string
  ) => {
    setTodoLists(prevTodoLists => {
      return prevTodoLists.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            todoItems: [
              ...todoList.todoItems,
              {
                itemId: todoList.todoItems.length + 1,
                itemTitle: newTodoItemTitle,
                itemDescription: newTodoItemDescription,
                completed: false,
                deadlineDate: deadlineDate,
                deadlineTime: deadlineTime,
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
              if (todoItem.itemId === todoItemId) {
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
              if (todoItem.itemId === itemId) {
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

  const handleListPriorityChange = (listId: number) => {
    setTodoLists(prevLists => {
      return prevLists.map(todoList => {
        if (todoList.id === listId) {
          return {
            ...todoList,
            topPriority: !todoList.topPriority,
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
    changeListPriority: handleListPriorityChange,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
