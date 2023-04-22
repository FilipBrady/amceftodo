import { Dispatch, SetStateAction } from 'react';

type Props = {
  setFilter: Dispatch<SetStateAction<string>>;
  setSearchTitle: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<SetStateAction<boolean>>;
  filter: string;
};
const TodoFilter = ({
  setFilter,
  filter,
  setSearchTitle,
  setSearchType,
}: Props) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='btn-group'>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'btn btn-active' : 'btn'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'btn btn-active' : 'btn'}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('inProgress')}
          className={filter === 'inProgress' ? 'btn btn-active' : 'btn'}
        >
          In Progress
        </button>
      </div>
      <div className='flex flex-row items-baseline'>
        <input
          type='text'
          placeholder='Search in Titles'
          className='input input-bordered input-info max-w-xs my-2'
          onChange={text => setSearchTitle(text.target.value)}
        />
        <div className='form-control'>
          <label className='label cursor-pointer'>
            <span className='label-text me-1'>Title</span>
            <input
              type='checkbox'
              className='toggle'
              onChange={toggle => setSearchType(toggle.target.checked)}
            />
            <span className='label-text ms-1'>Item</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default TodoFilter;
