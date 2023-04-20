import InputComponent from '@/components/codeComponents/InputComponent';
import { useAppContainer } from '@/components/container/Context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditTodo = () => {
  const { todos, editListTitle } = useAppContainer();
  const [todoToEdit, setTodoToEdit] = useState<any>([]);
  const router = useRouter();
  const TodoListId: string | string[] | undefined = router.query.TodoListId;
  const id = Array.isArray(TodoListId) ? TodoListId[0] : TodoListId || '';
  const [inputValue, setInputValue] = useState('');
  const [editOption, setEditOption] = useState('title');
  useEffect(() => {
    todos.map(todo => {
      if (todo.id === parseInt(id)) {
        setTodoToEdit(todo);
      }
    });
  }, []);

  // console.log(todoToEdit.todoItems[0].itemTitle);
   todoToEdit.todoItems.map((item: any) => {
    console.log(item);
  });

  function handleInputSubmit(event: any) {
    event.preventDefault();
    editListTitle(parseInt(id), inputValue);
    // console.log(inputValue);
    setInputValue('');
    // setInputValue(event.target.value);
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-5'>
      <Link
        href='/'
        className='btn btn-secondary btn-sm btn-square relative -left-1/3'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='#000000'
          width='30px'
          height='30px'
          viewBox='-4.5 0 32 32'
          version='1.1'
        >
          <title>home</title>
          <path d='M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z' />
        </svg>
      </Link>
      <div className='btn-group'>
        <button
          className={editOption === 'title' ? 'btn btn-active' : 'btn'}
          onClick={() => setEditOption('title')}
        >
          List Title
        </button>
        <button
          className={editOption === 'item' ? 'btn btn-active' : 'btn'}
          onClick={() => setEditOption('item')}
        >
          List Item
        </button>
      </div>
      {todoToEdit.listTitle}
      {editOption === 'title' ? (
        <form
          onSubmit={(event: any) => {
            handleInputSubmit(event);
          }}
          className='text-center'
        >
          <InputComponent
            inputName='Todo List Title'
            currentTitle={todoToEdit.listTitle}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
          <button className='btn btn-success'>Submit</button>
        </form>
      ) : (
        <form
          onSubmit={(event: any) => {
            handleInputSubmit(event);
          }}
          className='text-center'
        >
          <InputComponent
            inputName='ItemTitle'
            currentTitle={todoToEdit.listTitle}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
          <InputComponent
            inputName='itemDescription'
            currentTitle={todoToEdit.listTitle}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
          <button className='btn btn-success'>Submit</button>
        </form>
      )}
    </main>
  );
};
export default EditTodo;
