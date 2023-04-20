import AddToDoList from './addingTodos/AddTodoList';
import TodoList from './todos/TodoList';

const TodoDashboard = () => {
  return (
    <div className='text-center'>
      <TodoList />

      <label htmlFor={`addTodoList`} className='btn'>
        Add List
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
