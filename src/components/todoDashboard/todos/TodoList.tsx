import AddToDoItem from '../addingTodos/AddTodoItem';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
type Props = {
  todo: {
    id: number;
    listTitle: string;
    todoItems: {
      id: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
    }[];
  };
};
const TodoList = ({ todo }: Props) => { 
  return (
    <div>
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
    </div>
  );
};
export default TodoList;
