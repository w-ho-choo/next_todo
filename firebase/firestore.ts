import { firebaseApp } from './config'
import { getFirestore } from 'firebase/firestore'

const fireStore = getFirestore(firebaseApp)

export default fireStore
