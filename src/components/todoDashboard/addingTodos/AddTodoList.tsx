import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppContainer } from '@/components/container/Context';
import { useRouter } from 'next/router';
import svgOptions from '@/components/components/svgOptions';

const AddToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { addTodoList } = useAppContainer();
  const [todoTitle, setTodoTitle] = useState('');
  const router = useRouter();
  const handleListCreating = (data: any) => {
    addTodoList(data.title, data.itemTitle, data.itemDescription, {
      date: data.date,
      time: data.time,
    });
    reset();

    router.push('/');
  };

  return (
    <div>
      <form
        className='flex flex-col items-center'
        onSubmit={handleSubmit(data => handleListCreating(data))}
      >
        <label className='label flex flex-col justify-start items-start w-3/5'>
          <span className='label-text ms-2 z-20'>List Title</span>
          <input
            type='text'
            {...register('title', {
              required: 'Todo title is required',
              minLength: 4,
            })}
            aria-invalid={errors.title ? 'true' : 'false'}
            placeholder='Shopping list'
            className='input input-bordered input-info w-full max-w-xs'
            onChange={title => setTodoTitle(title.target.value)}
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

        {todoTitle.length >= 4 && (
          <div className='w-full flex flex-col items-center'>
            <label className='label flex flex-col justify-start items-start w-3/5'>
              <span className='label-text  ms-2 z-20'>Item Title</span>
              <input
                type='text'
                {...register('itemTitle', {
                  required: 'Item Title is required',
                  minLength: 4,
                })}
                aria-invalid={errors.itemTitle ? 'true' : 'false'}
                placeholder='Bread'
                className='input input-bordered input-info w-full max-w-xs'
              />
            </label>

            {errors.itemTitle?.type === 'required' && (
              <div className='alert alert-warning shadow-lg w-fit mt-0'>
                <div>
                  {svgOptions({ svgPicture: 'error' })}
                  <span>{errors.itemTitle.message?.toString()}</span>
                </div>
              </div>
            )}
            {errors.itemTitle?.type === 'minLength' && (
              <div className='alert alert-warning shadow-lg w-fit my-1'>
                <div>
                  {svgOptions({ svgPicture: 'error' })}
                  <span>Minimum length is 4 letters</span>
                </div>
              </div>
            )}

            <label className='label flex flex-col justify-start items-start w-3/5'>
              <span className='label-text  ms-2 z-20'>Item description</span>
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
              <span className='label-text ms-2 z-20'>Item Deadline TIme</span>
              <input
                type='time'
                {...register('time')}
                aria-invalid={errors.time ? 'true' : 'false'}
                className='input input-bordered input-info w-full max-w-xs'
                defaultValue='00:00'
              />
            </label>
          </div>
        )}

        <button className='btn btn-wide  btn-success'>Add ToDo List</button>
      </form>
    </div>
  );
};
export default AddToDoList;
