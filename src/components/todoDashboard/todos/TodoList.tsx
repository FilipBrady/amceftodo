import { useState } from 'react';
import AddToDoItem from '../addingTodos/AddTodoItem';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { useAppContainer } from '@/components/container/Context';
import TodoFilter from './components/TodoFilter';
import TodoIndicator from './components/TodoIndicator';

const TodoList = () => {
  const { todoLists } = useAppContainer();
  const [filter, setFilter] = useState('all');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchType, setSearchType] = useState(false);
  const topPriorotyFirst = todoLists.sort(
    (firstList: any, secondList: any) =>
      secondList.topPriority - firstList.topPriority
  );
  const filteredData = topPriorotyFirst
    .map((todoList: any) => ({
      ...todoList,
      todoItems: todoList.todoItems.filter((todoItem: any) => {
        if (filter === 'completed') {
          return todoItem.completed;
        } else if (filter === 'inProgress') {
          return !todoItem.completed;
        } else {
          return true;
        }
      }),
    }))
    .filter((todoList: any) => {
      if (!searchType) {
        return todoList.listTitle
          .toLowerCase()
          .includes(searchTitle.toLowerCase())
          ? true
          : searchTitle === '';
      } else if (searchType) {
        return (
          todoList.todoItems.filter((todoItem: any) => {
            if (
              todoItem.itemTitle
                .toLowerCase()
                .includes(searchTitle.toLowerCase())
            ) {
              return true;
            } else {
              return searchTitle === '';
            }
          })[0] !== undefined
        );
      }
    });

  return (
    <div>
      <TodoFilter
        setFilter={setFilter}
        filter={filter}
        setSearchTitle={setSearchTitle}
        setSearchType={setSearchType}
      />

      <div className='flex flex-row flex-wrap justify-center items-start gap-4 my-2'>
        {filteredData.map(todoList => {
          return (
            <div key={todoList.id} className='indicator'>
              <TodoIndicator todoList={todoList} />
              <div className='bg-white w-96 my-2 px-2 py-3 rounded-lg shadow-xl text-center'>
                <TodoHeader key={todoList.d} todoList={todoList} />
                {todoList.todoItems.map((todoItem: any) => (
                  <div key={todoItem.itemId}>
                    <TodoItem todoItem={todoItem} todoList={todoList} />
                  </div>
                ))}

                <label htmlFor={`addTodoList${todoList.id}`} className='btn'>
                  Add Todo Item
                </label>
                <input
                  type='checkbox'
                  id={`addTodoList${todoList.id}`}
                  className='modal-toggle'
                />
                <div className='modal'>
                  <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Add new Todo item.</h3>
                    <AddToDoItem todo={todoList} />
                    <div className='modal-action'>
                      <label
                        htmlFor={`addTodoList${todoList.id}`}
                        className='btn'
                      >
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TodoList;
