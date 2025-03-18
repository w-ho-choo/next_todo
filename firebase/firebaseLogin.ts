import { firebaseAuth } from './config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider()
export const loginGoogle = () => {
  return signInWithPopup(firebaseAuth, provider)
}
