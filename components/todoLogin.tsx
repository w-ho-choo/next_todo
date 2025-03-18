'use client'

import moment from 'moment'
import fireStore from '@/firebase/firestore'
import { loginGoogle } from '@/firebase/firebaseLogin'
import { doc, setDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function TodoLogin() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = async () => {
    try {
      const result = await loginGoogle()
      const user = result.user

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)

      await setDoc(
        doc(fireStore, 'user', user.uid),
        {
          uid: user.uid,
          displayName: user.displayName,
          date_created: moment().utc().format(),
        },
        { merge: true },
      )
    } catch (error) {
      console.log('실패')
    }
  }
  return (
    <div
      className={`absolute w-full h-full bg-gray-50 top-0 left-0 ${
        !user ? 'flex' : 'hidden'
      } justify-center items-center flex-col`}
    >
      <p className='text-3xl font-extrabold'>로그인이 필요해요!</p>
      <button
        onClick={login}
        className='py-2 px-4 rounded-md bg-cyan-400 text-white cursor-pointer mt-2'
      >
        구글로 로그인하기
      </button>
    </div>
  )
}
