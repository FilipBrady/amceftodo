import { Dispatch, SetStateAction, useState } from 'react';
import AddToDoItem from '../addingTodos/AddTodoItem';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { useAppContainer } from '@/components/container/Context';

const TodoList = () => {
  const { todoLists } = useAppContainer();
  const [filter, setFilter] = useState('all');

  const filteredData = todoLists.map((todoList: any) => ({
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
  }));

  return (
    <div>
      <div className='btn-group'>
        <button onClick={() => setFilter('all')} className='btn btn-active'>
          All
        </button>
        <button onClick={() => setFilter('completed')} className='btn'>
          Completed
        </button>
        <button onClick={() => setFilter('inProgress')} className='btn'>
          In Progress
        </button>
      </div>
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
  );
};
export default TodoList;
