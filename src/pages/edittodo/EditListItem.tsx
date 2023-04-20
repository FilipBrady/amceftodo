import InputComponent from '@/components/codeComponents/InputComponent';
import { useAppContainer } from '@/components/container/Context';
import { useState } from 'react';

type Props = {
  todoToEdit: any;
};
const EditListItem = ({ todoToEdit }: Props) => {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [selectedItem, setSelectekItem] = useState(0);
  const { editTodoItem } = useAppContainer();

  function handleInputSubmit(event: any) {
    event.preventDefault();
    // editTodoItem(Number(id), inputValue);
    editTodoItem(todoToEdit.id, selectedItem, newItemTitle, newItemDescription);
    setNewItemTitle('');
    setNewItemDescription('');
  }
  return (
    <div>
      <form
        onSubmit={(event: any) => {
          handleInputSubmit(event);
        }}
        className='text-center'
      >
        {todoToEdit && todoToEdit.todoItems && (
          <select
            className='select select-info w-full max-w-xs my-2'
            onChange={option => setSelectekItem(Number(option.target.value))}
          >
            <option value={0}>Choose item to edit</option>
            {todoToEdit.todoItems.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.itemTitle}
              </option>
            ))}
          </select>
        )}
        <InputComponent
          inputName='ItemTitle'
          currentTitle={todoToEdit.listTitle}
          setInputValue={setNewItemTitle}
          inputValue={newItemTitle}
        />
        <InputComponent
          inputName='itemDescription'
          currentTitle={todoToEdit.listTitle}
          setInputValue={setNewItemDescription}
          inputValue={newItemDescription}
        />
        <button className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
};
export default EditListItem;
