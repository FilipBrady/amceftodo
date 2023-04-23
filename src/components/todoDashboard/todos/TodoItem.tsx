import { useAppContainer } from '@/components/container/Context';
import { useEffect, useState } from 'react';

type Props = {
  todoList: {
    id: number;
    listTitle: string;
    todoItems: {
      itemId: number;
      itemTitle: string;
      itemDescription: string;
      completed: boolean;
      deadlineDate: string;
      deadlineTime: string;
    }[];
  };
  todoItem: {
    itemId: number;
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
  const deadlineDay = new Date(todoItem.deadlineDate).getDate();
  const deadlineMonth = new Date(todoItem.deadlineDate).getMonth();
  const deadlineYear = new Date(todoItem.deadlineDate).getFullYear();
  const deadlineHour = new Date(todoItem.deadlineDate).getHours();
  const deadlineMinutes = new Date(todoItem.deadlineDate).getMinutes();

  return (
    <div
      className={isCompleted ? 'completedItemBox' : 'notCompletedItemBox'}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
    >
      <div>
        <div
          className={
            todoItem.completed
              ? 'line-through text-md font-bold'
              : 'text-md font-bold'
          }
        >
          {todoItem.itemTitle}
        </div>
        {isItemHovered ? (
          <div>
            <div className='text-xs font-light'>{todoItem.itemDescription}</div>
            <div className='text-xs font-semibold'>
              Deadline: {deadlineDay}/{deadlineMonth}/{deadlineYear},{' '}
              {deadlineHour}:
              {deadlineMinutes.toString().length === 1
                ? '0' + deadlineMinutes
                : deadlineMinutes}
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
            switchComplete(todoList.id, todoItem.itemId, todoItem.completed);
            setIsCompleted(!isCompleted);
          }}
        />
      </div>
    </div>
  );
};
export default TodoItem;
