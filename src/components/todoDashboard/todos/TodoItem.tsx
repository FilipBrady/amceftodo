import { useAppContainer } from '@/components/container/Context';
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
  todoItem: {
    id: number;
    itemTitle: string;
    itemDescription: string;
    completed: boolean;
    deadline: string;
  };
};
const TodoItem = ({ todoItem, todo }: Props) => {
  const { switchComplete } = useAppContainer();
  const [isCompleted, setIsCompleted] = useState(todoItem.completed);
  const [isItemHovered, setIsItemHovered] = useState(false);
  const deadlineDay = Number(todoItem.deadline.slice(8, 10));
  const deadlineMonth = Number(todoItem.deadline.slice(5, 7));
  const deadlineYear = Number(todoItem.deadline.slice(0, 4));
  const currentTime = new Date();
  console.log(deadlineDay - currentTime.getDate());
  console.log(deadlineMonth - currentTime.getMonth());
  console.log(deadlineYear - currentTime.getFullYear());

  // function dateDifference(a: any, b: any) {
  //   const msPerDay = 100 * 60 * 60 * 24;
  //   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  //   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  //   return Math.floor((utc2 - utc1) / msPerDay);
  // }
  // const a = currentTime,
  //   b = todoItem.deadline,
  //   difference = dateDifference(a, b);
  // console.log(difference);

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
            <div className='text-xs font-light'>
              Deadline: {deadlineDay}/{deadlineMonth}/{deadlineYear}
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
            switchComplete(todo.id, todoItem.id);
            setIsCompleted(!isCompleted);
          }}
        />
      </div>
    </div>
  );
};
export default TodoItem;
