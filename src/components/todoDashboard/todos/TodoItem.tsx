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
  };
};
const TodoItem = ({ todoItem, todo }: Props) => {
  const { switchComplete } = useAppContainer();
  const [isCompleted, setIsCompleted] = useState(todoItem.completed);
  return (
    <div className={isCompleted ? 'completedItemBox' : 'notCompletedItemBox'}>
      <div>
        <div className='text-md font-bold'>{todoItem.itemTitle}</div>
        <div className='text-xs font-light'>{todoItem.itemDescription}</div>
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
