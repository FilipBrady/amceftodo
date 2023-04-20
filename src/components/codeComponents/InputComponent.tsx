import { useForm } from 'react-hook-form';
import { useAppContainer } from '../container/Context';
import { Dispatch, SetStateAction } from 'react';

type InputProps = {
  inputName: string;
  currentTitle: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
};

export default function InputComponent({
  inputName,
  currentTitle,
  setInputValue,
  inputValue,
}: InputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <label className='label flex flex-col justify-start items-start'>
        <span className='label-text -mb-1 ms-2 z-20'> {inputName}</span>
        <input
          value={inputValue}
          type='text'
          {...register(`${inputName}`, {
            required: 'Todo field is required',
            minLength: 4,
          })}
          aria-invalid={errors.inputName ? 'true' : 'false'}
          placeholder={currentTitle}
          className='input input-bordered input-info w-full max-w-xs'
          onChange={text => setInputValue(register(text.target.value).name)}
        />
      </label>
      {errors.inputName?.type === 'required' && (
        <div className='alert alert-warning shadow-lg w-fit mt-0'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <span>{errors.inputName.message?.toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
