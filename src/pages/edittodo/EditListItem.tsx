import { useAppContainer } from '@/components/container/Context';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  todoToEdit: any;
};
const EditListItem = ({ todoToEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [selectedItem, setSelectekItem] = useState(0);
  const { editTodoItem } = useAppContainer();

  function handleInputSubmit(event: any) {
    editTodoItem(
      todoToEdit.id,
      selectedItem,
      event.title,
      event.itemDescriptiom
    );
    router.push('/');
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit((event: any) => {
          handleInputSubmit(event);
        })}
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
        <label className='label flex flex-col justify-start items-start'>
          <span className='label-text  ms-2 z-20'>New item title</span>
          <input
            type='text'
            {...register('title', {
              required: 'Todo field is required',
              minLength: 4,
            })}
            aria-invalid={errors.title ? 'true' : 'false'}
            placeholder='New Item Title'
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>

        {errors.title?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span>{errors.title.message?.toString()}</span>
            </div>
          </div>
        )}
        {errors.title?.type === 'minLength' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
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
            placeholder='New Item Description'
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>

        {errors.itemDescriptiom?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span>{errors.itemDescriptiom.message?.toString()}</span>
            </div>
          </div>
        )}
        {errors.itemDescriptiom?.type === 'minLength' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span>Minimum length is 4 letters</span>
            </div>
          </div>
        )}
        {/* <InputComponent
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
        /> */}
        <button className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
};
export default EditListItem;
