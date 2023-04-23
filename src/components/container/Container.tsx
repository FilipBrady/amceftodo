import { useEffect, useState } from 'react';
import { Provider } from './Context';
import axios from 'axios';
import { todoLists } from '../data/todoList';
export type AppState = {
  todoLists: todoLists;
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
  switchComplete: (
    listId: number,
    todoItemId: number,
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
  const mockApiUrl = 'https://643ffbecb9e6d064be04a18a.mockapi.io/todoList';
  const [todoLists, setTodoLists] = useState<todoLists>([]);

  const getData = () => {
    axios
      .get('https://643ffbecb9e6d064be04a18a.mockapi.io/todoList')
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
      deadlineDate:
        new Date(`${deadlineDate} ${deadlineTime}`).getTime() / 1000,
    };
    axios
      .post(mockApiUrl, {
        listTitle: newListTitle,
        topPriority: false,
      })
      .then(res => {
        axios
          .post(mockApiUrl + '/' + res.data.id + '/todoitem', {
            ...newTodoItem,
          })
          .then(res => {
            getData();
          });
      });
  };

  const handleAddTodoItem = (
    listId: number,
    newTodoItemTitle: string,
    newTodoItemDescription: string,
    deadlineDate: string,
    deadlineTime: string
  ) => {
    const newTodoItem = {
      itemTitle: newTodoItemTitle,
      itemDescription: newTodoItemDescription,
      completed: false,
      deadlineDate:
        new Date(`${deadlineDate} ${deadlineTime}`).getTime() / 1000,
    };
    axios
      .post(mockApiUrl + '/' + listId + '/todoitem', {
        ...newTodoItem,
      })
      .then(res => {
        getData();
      });
  };
  const handleItemComplete = (
    listId: number,
    todoItemId: number,
    itemCompleted: boolean
  ) => {
    axios
      .put(mockApiUrl + '/' + listId + '/todoitem' + '/' + todoItemId, {
        completed: !itemCompleted,
      })
      .then(res => {
        getData();
      });
  };

  const handleListDelete = (listId: number) => {
    todoLists.map((todoList: any) => {
      if (todoList.id === listId) {
        todoList.todoItems.map((todoItem: any) => {
          axios
            .delete(mockApiUrl + '/' + listId + '/todoitem/' + todoItem.itemId)
            .catch(error => {
              axios.delete(
                mockApiUrl + '/' + listId + '/todoitem/' + todoItem.itemId
              );
            });
        });
      }
    });
    axios.delete(mockApiUrl + '/' + listId).then(res => {
      getData();
    });
  };

  const handleEditTodoTitle = (listId: number, editedTodoTitle: string) => {
    axios
      .put(mockApiUrl + '/' + listId, {
        listTitle: editedTodoTitle,
      })
      .then(res => {
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
      .put(mockApiUrl + '/' + listId + '/todoitem/' + itemId, {
        itemTitle: editedItemTitle,
        itemDescription: editedItemDescription,
      })
      .then(res => {
        getData();
      });
  };

  const handleListPriorityChange = (listId: number, listPriority: boolean) => {
    axios
      .put(mockApiUrl + '/' + listId, {
        topPriority: !listPriority,
      })
      .then(res => {
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
