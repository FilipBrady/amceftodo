'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppContainer } from '@/components/container/Context';
import { useRouter } from 'next/router';

const AddToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addTodoList } = useAppContainer();
  const [todoTitle, setTodoTitle] = useState('');
  const router = useRouter();
  const handleListCreating = async (data: any) => {
    // console.log(data.date);
    addTodoList(data.title, data.itemTitle, data.itemDescription, data.date, data.time);
    router.push('/');
  };

  

  return (
    <div>
      <form
        className='flex flex-col items-center gap-2'
        onSubmit={handleSubmit(data => handleListCreating(data))}
      >
        <label className='label flex flex-col justify-start items-start'>
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

        {todoTitle.length >= 4 && (
          <div>
            <label className='label flex flex-col justify-start items-start'>
              <span className='label-text  ms-2 z-20'>Item Title</span>
              <input
                type='text'
                {...register('itemTitle', {
                  required: 'Todo itemTitle is required',
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
                  <span>{errors.itemTitle.message?.toString()}</span>
                </div>
              </div>
            )}
            {errors.itemTitle?.type === 'minLength' && (
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
              <span className='label-text  ms-2 z-20'>Todo description</span>
              <input
                type='text'
                {...register('itemDescription', {
                  required: 'Todo description is required',
                  minLength: 4,
                })}
                aria-invalid={errors.itemDescription ? 'true' : 'false'}
                placeholder='Buy Bread!'
                className='input input-bordered input-info w-full max-w-xs'
              />
            </label>
            {errors.itemDescription?.type === 'required' && (
              <div className='alert alert-warning shadow-lg w-fit mt-0'>
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
                  <span>{errors.itemDescription.message?.toString()}</span>
                </div>
              </div>
            )}
            {errors.itemDescription?.type === 'minLength' && (
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
              <span className='label-text ms-2 z-20'>Item Deadline</span>
              <input
                type='date'
                {...register('date', {
                  required: 'Item Deadline is required',
                  minLength: 4,
                })}
                aria-invalid={errors.date ? 'true' : 'false'}
                placeholder='Shopping list'
                className='input input-bordered input-info w-full max-w-xs'
              />
            </label>
            {errors.date?.type === 'required' && (
              <div className='alert alert-warning shadow-lg w-fit mt-0'>
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
                  <span>{errors.date.message?.toString()}</span>
                </div>
              </div>
            )}
            <label className='label flex flex-col justify-start items-start'>
              <span className='label-text ms-2 z-20'>Item Deadline TIme</span>
              <input
                type='time'
                {...register('time', {
                  required: 'Deadline is required',
                  minLength: 4,
                })}
                aria-invalid={errors.time ? 'true' : 'false'}
                placeholder='Shopping list'
                className='input input-bordered input-info w-full max-w-xs'
              />
            </label>
            {errors.time?.type === 'required' && (
              <div className='alert alert-warning shadow-lg w-fit mt-0'>
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
                  <span>{errors.time.message?.toString()}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <button className='btn btn-wide  btn-success'>Add ToDo List</button>
      </form>
    </div>
  );
};
export default AddToDoList;
