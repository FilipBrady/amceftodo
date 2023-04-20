import InputComponent from '@/components/codeComponents/InputComponent';
import { useAppContainer } from '@/components/container/Context';
import { useState } from 'react';

type Props = {
  todoToEdit: any;
};
const EditListTitle = ({ todoToEdit }: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { editListTitle } = useAppContainer();
  function handleInputSubmit(event: any) {
    event.preventDefault();
    // editTodoItem(Number(id), inputValue);
    setNewTodoTitle('');
    editListTitle(todoToEdit.id, newTodoTitle);
  }
  return (
    <form
      onSubmit={(event: any) => {
        handleInputSubmit(event);
      }}
      className='text-center'
    >
      <InputComponent
        inputName='Todo List Title'
        currentTitle={todoToEdit.listTitle}
        setInputValue={setNewTodoTitle}
        inputValue={newTodoTitle}
      />
      <button className='btn btn-success'>Submit</button>
    </form>
  );
};
export default EditListTitle;
