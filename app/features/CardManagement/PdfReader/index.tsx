import React from 'react'
import {StyleSheet} from 'react-native'
import Pdf from 'react-native-pdf'
import {Layout, TCTextView as Text} from '@Components'
import {StackNavigationProp} from '@react-navigation/stack'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}
const PdfReader = ({navigation}: Props) => {
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  }

  return (
    <Layout
      isBackground={false}
      isBack={true}
      onBack={() => navigation.goBack()}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`)
        }}
        onError={error => {
          console.log(error)
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`)
        }}
        style={styles.pdf}
      />
    </Layout>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    marginTop: 10,
  },
})
export default PdfReader
