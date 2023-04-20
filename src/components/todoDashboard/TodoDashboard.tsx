import { useAppContainer } from '../container/Context';
import AddToDoList from './addingTodos/AddTodoList';
import TodoList from './todos/TodoList';

const TodoDashboard = () => {
  const { todos } = useAppContainer();
  
  return (
    <div className='text-center'>
      {todos.map(todo => (
        <TodoList key={todo.id} todo={todo} />
      ))}

      <label htmlFor={`addTodoList`} className='btn'>
        Add item
      </label>

      <input type='checkbox' id={`addTodoList`} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add new Todo item.</h3>
          <AddToDoList />
          <div className='modal-action'>
            <label htmlFor={`addTodoList`} className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoDashboard;
