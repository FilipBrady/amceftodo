import { useAppContainer } from '@/components/container/Context';
import { todoList } from '@/types/todoList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import svgOptions from '@/components/components/svgOptions';

type Props = { todoToEdit: todoList };

const EditListItem = ({ todoToEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [selectedItem, setSelectekItem] = useState(0);
  const { todoLists, editTodoItem } = useAppContainer();
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [selectedItemDescription, setSelectedItemDescription] = useState('');
  function handleInputSubmit(event: any) {
    editTodoItem(
      Number(router.query.TodoListId),
      selectedItem,
      event.title,
      event.itemDescriptiom
    );
    router.push('/');
  }
  useEffect(() => {
    todoToEdit.todoItems.map((todoItem: any) => {
      if (Number(todoItem.itemId) == Number(selectedItem)) {
        setSelectedItemTitle(todoItem.itemTitle);
        setSelectedItemDescription(todoItem.itemDescription);
      }
    });
  }, [selectedItem]);

  return (
    <div>
      <form
        onSubmit={handleSubmit((event: any) => {
          handleInputSubmit(event);
        })}
        className='text-center'
      >
        <select
          className='select select-info w-full max-w-xs my-2'
          onChange={option => setSelectekItem(Number(option.target.value))}
        >
          <option value={0}>Choose item to edit</option>
          {todoLists.map(todoList => {
            if (Number(todoList.id) === Number(router.query.TodoListId)) {
              return todoList.todoItems.map((item: any) => (
                <option key={item.itemId} value={item.itemId}>
                  {item.itemTitle}
                </option>
              ));
            }
          })}
        </select>
        <label className='label flex flex-col justify-start items-start'>
          <span className='label-text  ms-2 z-20'>New item title</span>
          <input
            type='text'
            {...register('title', {
              required: 'Todo field is required',
              minLength: 4,
            })}
            aria-invalid={errors.title ? 'true' : 'false'}
            placeholder={
              selectedItem === 0 ? 'Edit your item title' : selectedItemTitle
            }
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>

        {errors.title?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>{errors.title.message?.toString()}</span>
            </div>
          </div>
        )}
        {errors.title?.type === 'minLength' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>Minimum length is 4 letters</span>
            </div>
          </div>
        )}
        <label className='label flex flex-col justify-start items-start'>
          <span className='label-text  ms-2 z-20'> new item description</span>
          <input
            type='text'
            {...register('itemDescriptiom', {
              required: 'Todo field is required',
              minLength: 4,
            })}
            aria-invalid={errors.itemDescriptiom ? 'true' : 'false'}
            placeholder={
              selectedItem === 0
                ? 'Edit your item description'
                : selectedItemDescription
            }
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>

        {errors.itemDescriptiom?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>{errors.itemDescriptiom.message?.toString()}</span>
            </div>
          </div>
        )}
        {errors.itemDescriptiom?.type === 'minLength' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>Minimum length is 4 letters</span>
            </div>
          </div>
        )}
        <button className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
};
export default EditListItem;
