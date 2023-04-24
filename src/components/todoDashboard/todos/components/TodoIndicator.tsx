type Props = {
  todoList: any;
};
const TodoIndicator = ({ todoList }: Props) => {
  const totalItems = todoList.todoItems.length;

  const completedItems = todoList.todoItems.filter(
    (todoItem: any) => todoItem.completed
  ).length;
  return (
    <span className='indicator-item h-6 indicator-center badge text-black border-none bg-[#b8b4f3] mt-1 shadow-lg font-semibold'>
      <span className='text-green-600 font-bold'>{completedItems}</span>/
      <span className='text-red-600 font-bold '>{totalItems}</span> DONE
    </span>
  );
};
export default TodoIndicator;
