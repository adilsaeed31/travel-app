import {create} from 'zustand'
import LoginStore from './login'

export const useStore = create(set => ({
  ...LoginStore(set),
}))
