'use client'
import fireStore from '@/firebase/firestore'
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function TodoList() {
  const [data, setData] = useState<DocumentData>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(fireStore, 'todos'),
          where('uid', '==', 'iqOcvxJt25MLyT8FlB0xpTAw2572'),
        )
        const querySnapshop = await getDocs(q)
        const docsData = querySnapshop.docs.map((doc) => doc.data())
        setData(docsData)
        console.log(docsData)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return <div>투두리스트</div>
}
