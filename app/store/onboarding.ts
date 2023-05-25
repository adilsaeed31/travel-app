// below is the example to set the multiple files state and store
export type OnBoardingStoreProps = {
  title: string
  setTitle: () => void
}

export default (set: Function) => ({
  title: 'Travel Card OnBoarding',

  setTitle: () => {
    set(() => ({
      title: 'Travel Card OnBoarding',
    }))
  },
})
