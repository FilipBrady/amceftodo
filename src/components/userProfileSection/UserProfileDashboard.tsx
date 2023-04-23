import { useAppContainer } from '../container/Context';
import AddToDoList from '../todoDashboard/addingTodos/AddTodoList';
import avatarSvg from '../../images/avatar.svg';
import Image from 'next/image';
const UserProfileDashboard = () => {
  const { todoLists } = useAppContainer();
  const getCurrentDate = (separator = '') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };

  const totalItems = todoLists.reduce((totalItems: any, todoList: any) => {
    return totalItems + todoList.todoItems.length;
  }, 0);
  const completedItems = todoLists.reduce(
    (totalCompleted: any, todoList: any) => {
      return (
        totalCompleted +
        todoList.todoItems.filter((item: any) => item.completed).length
      );
    },
    0
  );

  return (
    <div>
      <div className='bg-white w-10/12 lg:w-7/12 mx-auto h-fit my-2 px-3 py-4 rounded-lg shadow-xl text-center flex sm:flex-row justify-between sm:items-end items-center mb-5 flex-col'>
        <div>
          <div className='w-24 rounded-full'>
            <Image src={avatarSvg} alt='user Avatar'/>
          </div>
        </div>
        {totalItems === completedItems ? (
          <div>
            <div>You have completed ALL your tasks</div>
            <div>🎉🎉🎉🎉</div>
          </div>
        ) : (
          <div>
            <div>
              <span className='text-green-500 font-bold'>{completedItems}</span>
              /<span className='text-red-600 font-bold '>{totalItems}</span>{' '}
              DONE
            </div>
            <progress
              className='progress progress-success w-56'
              value={completedItems}
              max={totalItems}
            ></progress>
          </div>
        )}

        <div className='flex flex-col gap-2 justify-between align-baseline'>
          <label htmlFor={`addTodoList`} className='btn'>
            Add List
          </label>
          <input type='checkbox' id={`addTodoList`} className='modal-toggle' />
          <div className='modal'>
            <div className='modal-box'>
              <h3 className='font-bold text-lg'>Add new Todo item.</h3>
              <AddToDoList />
              <div className='modal-action'>
                <label htmlFor={`addTodoList`} className='btn'>
                  Close
                </label>
              </div>
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='me-1'>{getCurrentDate('/')}</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20px'
              height='20px'
              viewBox='0 0 24 24'
              fill='none'
            >
              <rect
                x='3'
                y='6'
                width='18'
                height='15'
                rx='2'
                stroke='#33363F'
                strokeWidth='2'
              />
              <path
                d='M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z'
                fill='#33363F'
              />
              <path
                d='M7 3L7 6'
                stroke='#33363F'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M17 3L17 6'
                stroke='#33363F'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileDashboard;
