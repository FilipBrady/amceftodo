import { useAppContainer } from '@/components/container/Context';
import Link from 'next/link';
import { useState } from 'react';

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
const TodoHeader = ({ todo }: Props) => {
  const { deleteList } = useAppContainer();
  return (
    <div className='flex justify-between align-bottom'>
      <div className='text-xl font-bold'>{todo.listTitle}</div>
      <div>
        <Link
          href={`/edittodo/${todo.id}`}
          className='btn btn-accent btn-outline btn-sm mx-1 btn-square'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='20px'
            height='20px'
            viewBox='0 -0.5 21 21'
            version='1.1'
          >
            <g
              id='Page-1'
              stroke='none'
              strokeWidth='1'
              fill='none'
              fillRule='evenodd'
            >
              <g
                id='Dribbble-Light-Preview'
                transform='translate(-59.000000, -400.000000)'
                fill='#000000'
              >
                <g id='icons' transform='translate(56.000000, 160.000000)'>
                  <path
                    d='M3,260 L24,260 L24,258.010742 L3,258.010742 L3,260 Z M13.3341,254.032226 L9.3,254.032226 L9.3,249.950269 L19.63095,240 L24,244.115775 L13.3341,254.032226 Z'
                    id='edit_fill-[#1480]'
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <label
          htmlFor={`deleteTodoList${todo.id}`}
          className='btn btn-error btn-outline btn-sm mx-1 btn-square'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20px'
            height='20px'
            viewBox='0 0 24 24'
            fill='none'
          >
            <g id='Interface / Trash_Full'>
              <path
                id='Vector'
                d='M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
          </svg>
        </label>
      </div>
      <input
        type='checkbox'
        id={`deleteTodoList${todo.id}`}
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Do you really want to delete this List?
          </h3>
          {/* <AddToDoItem todo={todo} /> */}
          <div className='modal-action justify-center'>
            <label
              onClick={() => deleteList(todo.id)}
              className='btn btn-error'
            >
              Delete
            </label>
            <label htmlFor={`deleteTodoList${todo.id}`} className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoHeader;
