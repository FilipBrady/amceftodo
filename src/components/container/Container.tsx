import { useEffect, useState } from 'react';
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
  // const [todoLists, setTodoLists] = useState([
  //   {
  //     id: 1,
  //     listTitle: 'title 1',
  //     topPriority: false,
  //     todoItems: [
  //       {
  //         itemId: 1,
  //         itemTitle: 'item 1',
  //         itemDescription:
  //           'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
  //         completed: false,
  //         deadlineDate: '2023-04-23',
  //         deadlineTime: '22:15',
  //       },
  //       {
  //         itemId: 2,
  //         itemTitle: 'item 2',
  //         itemDescription: 'this is description',
  //         completed: false,
  //         deadlineDate: '2023-04-24',
  //         deadlineTime: '20:10',
  //       },
  //       {
  //         itemId: 3,
  //         itemTitle: 'item 3',
  //         itemDescription: 'this is description',
  //         completed: true,
  //         deadlineDate: '2023-04-25',
  //         deadlineTime: '8:23',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     listTitle: 'title 2',
  //     topPriority: true,
  //     todoItems: [
  //       {
  //         itemId: 1,
  //         itemTitle: 'item 1',
  //         itemDescription:
  //           'this is description this is description this is description this is description this is description this is description this is description this is description this is description ',
  //         completed: true,
  //         deadlineDate: '2023-04-26',
  //         deadlineTime: '18:23',
  //       },
  //       {
  //         itemId: 2,
  //         itemTitle: 'item 2',
  //         itemDescription: 'this is description 2',
  //         completed: false,
  //         deadlineDate: '2023-04-23',
  //         deadlineTime: '12:53',
  //       },
  //       {
  //         itemId: 3,
  //         itemTitle: 'item 3',
  //         itemDescription: 'this is description 3',
  //         completed: true,
  //         deadlineDate: '2023-04-25',
  //         deadlineTime: '18:45',
  //       },
  //     ],
  //   },
  // ]);
  const [todoLists, setTodoLists] = useState([]);

  const getData = () => {
    axios
      .get('https://643ffbecb9e6d064be04a18a.mockapi.io/todoList')
      .then((res: any) => {
        // console.log(res.data);
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
        deadlineTime === ''
          ? deadlineDate + 'T' + '23:59:00.000Z'
          : deadlineDate + 'T' + deadlineTime + ':00.000Z',
    };
    axios
      .post(mockApiUrl, {
        listTitle: newListTitle,
        topPriority: false,
      })
      .then(res => {
        console.log(res.data);
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
        deadlineTime === ''
          ? deadlineDate + 'T' + '23:59:00.000Z'
          : deadlineDate + 'T' + deadlineTime + ':00.000Z',
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
