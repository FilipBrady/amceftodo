import { useAppContainer } from '@/components/container/Context';
import Link from 'next/link';

type Props = {
  todoList: {
    id: number;
    listTitle: string;
    topPriority: boolean;
    todoItems: {
      itemId: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
      deadlineDate: string;
    }[];
  };
};
const TodoHeader = ({ todoList }: Props) => {
  const { deleteList, changeListPriority } = useAppContainer();

  return (
    <div className='flex justify-between align-bottom'>
      <div className='flex flex-row gap-2'>
        <div className='text-xl font-bold'>{todoList.listTitle}</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          version='1.0'
          id='Layer_1'
          width='25px'
          height='25px'
          viewBox='0 0 64 64'
          enableBackground='new 0 0 64 64'
          xmlSpace='preserve'
          onClick={() => changeListPriority(todoList.id, todoList.topPriority)}
        >
          <g>
            <path
              fill='#000000'
              d='M31.998,2.478c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167l-14.999,15.38l3.541,21.701   l-18.54-10.254l-18.54,10.254l3.541-21.701L2,24.912l20.729-3.167l8.798-18.743C31.527,3.002,31.719,2.478,31.998,2.478 M31.998,0   c-0.775,0-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343   c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957   c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719   c0.302,0.166,0.636,0.25,0.968,0.25c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704   l14.294-14.657c0.523-0.537,0.703-1.321,0.465-2.031c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15   C33.479,0.448,32.773,0,31.998,0L31.998,0z'
            />
            <path
              fill={todoList.topPriority ? '#ffff00' : '#000000'}
              d='M31.998,2.478c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167l-14.999,15.38l3.541,21.701   l-18.54-10.254l-18.54,10.254l3.541-21.701L2,24.912l20.729-3.167l8.798-18.743C31.527,3.002,31.719,2.478,31.998,2.478'
            />
          </g>
        </svg>
      </div>
      <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-primary btn-sm m-1'>
          ...
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32'
        >
          <li>
            <Link href={`/edittodo/${todoList.id}`}>
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
              <div>Edit</div>
            </Link>
          </li>
          <li>
            <label htmlFor={`deleteTodoList${todoList.id}`}>
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
              <div>Delete</div>
            </label>
          </li>
        </ul>
      </div>
      <input
        type='checkbox'
        id={`deleteTodoList${todoList.id}`}
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Do you really want to delete this List?
          </h3>
          <div className='modal-action justify-center'>
            <label
              onClick={() => deleteList(todoList.id)}
              className='btn btn-error'
            >
              Delete
            </label>
            <label htmlFor={`deleteTodoList${todoList.id}`} className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoHeader;
