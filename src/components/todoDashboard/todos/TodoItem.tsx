import { useAppContainer } from '@/components/container/Context';
import { todoItem, todoList } from '@/components/data/todoList';
import { useState } from 'react';

type Props = {
  todoList: todoList;
  todoItem: todoItem;
};
const TodoItem = ({ todoItem, todoList }: Props) => {
  const { switchComplete } = useAppContainer();
  const [isCompleted, setIsCompleted] = useState(todoItem.completed);
  const [isItemHovered, setIsItemHovered] = useState(false);

  const listDeadline = () => {
    const timestamp = todoItem.deadlineDate;
    const date = new Date(Number(timestamp) * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year} ${hours.toString().padStart(2, '1')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

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
            <div className='text-xs font-normal'>
              {todoItem.itemDescription}
            </div>
            <div className='text-xs font-semibold'>
              Deadline: {listDeadline()}
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
