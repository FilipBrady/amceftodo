import { Dispatch, SetStateAction, useState } from 'react';
import AddToDoItem from '../addingTodos/AddTodoItem';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { useAppContainer } from '@/components/container/Context';

const TodoList = () => {
  const { todoLists } = useAppContainer();
  const [filter, setFilter] = useState('all');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchType, setSearchType] = useState(false);
  const filteredData = todoLists
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
      <div className='flex flex-col items-center'>
        <div className='btn-group'>
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn btn-active' : 'btn'}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'btn btn-active' : 'btn'}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('inProgress')}
            className={filter === 'inProgress' ? 'btn btn-active' : 'btn'}
          >
            In Progress
          </button>
        </div>
        <div className='flex flex-row items-baseline'>
          <input
            type='text'
            placeholder='Search in Titles'
            className='input input-bordered input-info max-w-xs my-2'
            onChange={text => setSearchTitle(text.target.value)}
          />
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text me-1'>Title</span>
              <input
                type='checkbox'
                className='toggle'
                onChange={toggle => setSearchType(toggle.target.checked)}
              />
              <span className='label-text ms-1'>Item</span>
            </label>
          </div>
        </div>
      </div>

      <div className='flex flex-row flex-wrap justify-center items-start gap-4 my-2'>
        {filteredData.map(todo => (
          <div className='bg-white w-96 my-2 px-2 py-3 rounded-lg shadow-xl text-center'>
            <TodoHeader key={todo.id} todo={todo} />
            {todo.todoItems.map((todoItem: any) => (
              <div key={todoItem.id}>
                <TodoItem todoItem={todoItem} todo={todo} />
              </div>
            ))}
            <label htmlFor={`addTodoList${todo.id}`} className='btn'>
              Add Todo Item
            </label>

            <input
              type='checkbox'
              id={`addTodoList${todo.id}`}
              className='modal-toggle'
            />
            <div className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>Add new Todo item.</h3>
                <AddToDoItem todo={todo} />
                <div className='modal-action'>
                  <label htmlFor={`addTodoList${todo.id}`} className='btn'>
                    Close
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;
