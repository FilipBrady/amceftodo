import svgOptions from '@/components/components/svgOptions';
import { useAppContainer } from '@/components/container/Context';
import { todoList } from '@/types/todoList';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
type Props = {
  todoToEdit: todoList;
};
const EditListTitle = ({ todoToEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { editListTitle } = useAppContainer();
  function handleInputSubmit(event: any) {
    editListTitle(todoToEdit.id, event.title);
    router.push('/');
  }

  return (
    <form
      onSubmit={handleSubmit(event => handleInputSubmit(event))}
      className='text-center'
    >
      <label className='label flex flex-col justify-start items-start'>
        <span className='label-text  ms-2 z-20'>New title</span>
        <input
          type='text'
          {...register('title', {
            required: 'Todo field is required',
            minLength: 4,
          })}
          aria-invalid={errors.title ? 'true' : 'false'}
          placeholder={'Edit your list title'}
          className='input input-bordered input-info w-full max-w-xs'
        />
      </label>

      {errors.title?.type === 'required' && (
        <div className='alert alert-warning shadow-lg w-fit my-1'>
          <div>
            {svgOptions({ svgPicture: 'error' })}
            <span>{errors.title.message?.toString()}</span>
          </div>
        </div>
      )}
      {errors.title?.type === 'minLength' && (
        <div className='alert alert-warning shadow-lg w-fit my-1'>
          <div>
            {svgOptions({ svgPicture: 'error' })}
            <span>Minimum length is 4 letters</span>
          </div>
        </div>
      )}

      <button className='btn btn-success'>Submit</button>
    </form>
  );
};
export default EditListTitle;
