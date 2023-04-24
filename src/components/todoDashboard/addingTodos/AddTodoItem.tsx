import { useForm } from 'react-hook-form';
import { useAppContainer } from '@/components/container/Context';
import { useRouter } from 'next/router';
import { todoList } from '@/types/todoList';
import svgOptions from '@/components/components/svgOptions';

type Props = {
  todo: todoList;
};

const AddToDoItem = ({ todo }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { addTodoItem } = useAppContainer();

  const handleListCreating = (data: any) => {
    addTodoItem(todo.id, data.title, data.itemDescription, {
      date: data.date,
      time: data.time,
    });

    router.push('/');
  };

  return (
    <div>
      <form
        className='flex flex-col items-center'
        onSubmit={handleSubmit(data => handleListCreating(data))}
      >
        <label className='label flex flex-col justify-start items-start w-3/5 '>
          <span className='label-text ms-2 z-20'>Todo Title</span>
          <input
            type='text'
            {...register('title', {
              required: 'Todo title is required',
              minLength: 4,
            })}
            placeholder='Bread'
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>

        {errors.title?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit mt-0'>
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
        <label className='label flex flex-col justify-start items-start w-3/5'>
          <span className='label-text ms-2 z-20'>Item description</span>
          <textarea
            rows={3}
            {...register('itemDescription', {
              required: 'Item description is required',
              minLength: 4,
            })}
            aria-invalid={errors.itemDescription ? 'true' : 'false'}
            placeholder='Buy Bread!'
            className='textarea textarea-info w-full max-w-xs'
          />
        </label>
        {errors.itemDescription?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit mt-0'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>{errors.itemDescription.message?.toString()}</span>
            </div>
          </div>
        )}
        {errors.itemDescription?.type === 'minLength' && (
          <div className='alert alert-warning shadow-lg w-fit my-1'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>Minimum length is 4 letters</span>
            </div>
          </div>
        )}
        <label className='label flex flex-col justify-start items-start w-3/5'>
          <span className='label-text ms-2 z-20'>Item Deadline</span>
          <input
            type='date'
            {...register('date', {
              required: 'Item Deadline is required',
            })}
            aria-invalid={errors.date ? 'true' : 'false'}
            className='input input-bordered input-info w-full max-w-xs'
          />
        </label>
        {errors.date?.type === 'required' && (
          <div className='alert alert-warning shadow-lg w-fit mt-0'>
            <div>
              {svgOptions({ svgPicture: 'error' })}
              <span>{errors.date.message?.toString()}</span>
            </div>
          </div>
        )}
        <label className='label flex flex-col justify-start items-start w-3/5'>
          <span className='label-text ms-2 z-20'>Item Deadline Time</span>
          <input
            type='time'
            {...register('time')}
            aria-invalid={errors.time ? 'true' : 'false'}
            className='input input-bordered input-info w-full max-w-xs'
            defaultValue='00:00'
          />
        </label>
        <button className='btn btn-wide  btn-success'>Add Todo Item</button>
      </form>
    </div>
  );
};
export default AddToDoItem;
