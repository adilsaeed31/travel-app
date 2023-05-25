// below is the example to set the multiple files state and store
export type OnBoardingStoreProps = {
  title: string
  setTitle: () => void
}

export default (set: Function) => ({
  user: null,

  setUser: (user: any) => {
    set(() => ({
      user: user,
    }))
  },
})
