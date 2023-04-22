import { useAppContainer } from '@/components/container/Context';
import { useEffect, useState } from 'react';

type Props = {
  todoList: {
    id: number;
    listTitle: string;
    todoItems: {
      id: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
      deadlineDate: string;
      deadlineTime: string;
    }[];
  };
  todoItem: {
    id: number;
    itemTitle: string;
    itemDescription: string;
    completed: boolean;
    deadlineDate: string;
    deadlineTime: string;
  };
};
const TodoItem = ({ todoItem, todoList }: Props) => {
  const { switchComplete } = useAppContainer();
  const [isCompleted, setIsCompleted] = useState(todoItem.completed);
  const [isItemHovered, setIsItemHovered] = useState(false);
  const deadlineDay = Number(todoItem.deadlineDate.slice(8, 10));
  const deadlineMonth = Number(todoItem.deadlineDate.slice(5, 7));
  const deadlineYear = Number(todoItem.deadlineDate.slice(0, 4));

  return (
    <div
      className={isCompleted ? 'completedItemBox' : 'notCompletedItemBox'}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
    >
      <div>
        <div className='text-md font-bold'>{todoItem.itemTitle}</div>
        {isItemHovered ? (
          <div>
            <div className='text-xs font-light'>{todoItem.itemDescription}</div>
            <div className='text-xs font-semibold'>
              Deadline: {deadlineDay}/{deadlineMonth}/{deadlineYear},{' '}
              {todoItem.deadlineTime}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <input
          type='checkbox'
          className='toggle toggle-success toggle-sm'
          checked={isCompleted}
          onChange={() => {
            switchComplete(todoList.id, todoItem.id);
            setIsCompleted(!isCompleted);
          }}
        />
      </div>
    </div>
  );
};
export default TodoItem;
