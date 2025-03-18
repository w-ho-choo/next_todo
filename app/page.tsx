import TodoForm from '@/components/todoForm'
import TodoList from '@/components/todoList'
import TodoLogin from '@/components/todoLogin'

export default function Home() {
  return (
    <div className='w-full h-dvh flex flex-col justify-center items-center bg-gray-200 py-8'>
      <div className='w-full bg-white flex-1 max-w-5xl rounded-3xl p-6 relative overflow-hidden'>
        <TodoForm />
        <TodoList />
        <TodoLogin />
      </div>
    </div>
  )
}
