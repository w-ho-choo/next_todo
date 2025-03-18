'use client'
import fireStore from '@/firebase/firestore'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import moment from 'moment'
import { FormEvent, useEffect, useState } from 'react'

export default function TodoForm() {
  const [user, setUser] = useState<User | null>(null)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputValue.length > 2 && !inputValue && !user) return

    const randomNum = Math.floor(Math.random() * 1e15)

    await setDoc(
      doc(fireStore, 'todos', String(randomNum)),
      {
        id: randomNum,
        text: inputValue,
        uid: user?.uid,
        isDone: false,
        date_created: moment().utc().format('YYYY-MM-DD'),
      },
      { merge: true },
    )
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className=''>
      <form
        onSubmit={handleSubmit}
        className='flex gap-2'
      >
        <input
          type='text'
          placeholder='할일을 작성해주세요'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='flex-1 py-1 px-2 border-zinc-300 border rounded-sm'
        />
        <button className='px-4 bg-cyan-600 border-none text-white rounded-sm'>
          등록
        </button>
      </form>
    </div>
  )
}
