import { useEffect, useState } from 'react';
import { Provider } from './Context';
import axios from 'axios';
import { todoLists } from '@/types/todoList';
import { BASE_URL } from '@/constants/constants';
export type AppState = {
  todoLists: todoLists;
  addTodoList: (
    listTitle: string,
    itemTitle: string,
    DdscriptionTitle: string,
    deadline: { date: string; time: string }
  ) => void;
  addTodoItem: (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string,
    deadline: { date: string; time: string }
  ) => void;
  switchComplete: (
    listId: number,
    itemId: number,
    itemCompleted: boolean
  ) => void;
  deleteList: (listId: number) => void;
  editListTitle: (listId: number, editedTodoTitle: string) => void;
  editTodoItem: (
    listId: number,
    itemId: number,
    editedItemTitle: string,
    editedItemDescription: string
  ) => void;
  changeListPriority: (listId: number, listPriority: boolean) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState<todoLists>([]);

  const getData = () => {
    axios
      .get(`${BASE_URL}/todoList`)
      .then((res: any) => {
        setTodoLists(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAddTodoList = (
    listTitle: string,
    itemTitle: string,
    DdscriptionTitle: string,
    deadline: { date: string; time: string }
  ) => {
    const newTodoItem = {
      itemId: 1,
      itemTitle: itemTitle,
      itemDescription: DdscriptionTitle,
      completed: false,
      deadlineDate:
        new Date(`${deadline.date} ${deadline.time}`).getTime() / 1000,
    };
    axios
      .post(`${BASE_URL}/todoList}`, {
        listTitle: listTitle,
        topPriority: false,
      })
      .then(res => {
        axios
          .post(`${BASE_URL}/${res.data.id}todoitem`, {
            ...newTodoItem,
          })
          .then(() => {
            getData();
          });
      });
  };

  const handleAddTodoItem = (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string,
    deadline: { date: string; time: string }
  ) => {
    const newTodoItem = {
      itemTitle: newTodoItemTitle,
      itemDescription: newTodoItemDescription,
      completed: false,
      deadlineDate:
        new Date(`${deadline.date} ${deadline.time}`).getTime() / 1000,
    };
    axios
      .post(`${BASE_URL}/todoList/${listId}/todoitem`, {
        ...newTodoItem,
      })
      .then(() => {
        getData();
      });
  };
  const handleItemComplete = (
    listId: number,
    itemId: number,
    itemCompleted: boolean
  ) => {
    axios
      .put(`${BASE_URL}/todoList/${listId}/todoitem/${itemId}`, {
        completed: !itemCompleted,
      })
      .then(() => {
        getData();
      });
  };

  const handleListDelete = (listId: number) => {
    todoLists.map((todoList: any) => {
      if (todoList.id === listId) {
        todoList.todoItems.map((todoItem: any) => {
          axios
            .delete(
              `${BASE_URL}/todoList/${listId}/todoitem/${todoItem.itemId}`
            )
            .catch(error => {
              axios.delete(
                `${BASE_URL}/todoList/${listId}/todoitem/${todoItem.itemId}`
              );
            });
        });
      }
    });
    axios.delete(`${BASE_URL}/todoList/${listId}`).then(() => {
      getData();
    });
  };

  const handleEditTodoTitle = (listId: number, editedTodoTitle: string) => {
    axios
      .put(`${BASE_URL}/todoList/${listId}`, {
        listTitle: editedTodoTitle,
      })
      .then(() => {
        getData();
      });
  };

  const handleEditTodoItem = (
    listId: number,
    itemId: number,
    editedItemTitle: string,
    editedItemDescription: string
  ) => {
    axios
      .put(`${BASE_URL}/todoList/${listId}/todoitem/${itemId}`, {
        itemTitle: editedItemTitle,
        itemDescription: editedItemDescription,
      })
      .then(() => {
        getData();
      });
  };

  const handleListPriorityChange = (listId: number, listPriority: boolean) => {
    axios
      .put(`${BASE_URL}/todoList/${listId}`, {
        topPriority: !listPriority,
      })
      .then(() => {
        getData();
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
