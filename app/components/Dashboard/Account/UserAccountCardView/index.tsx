import React, {useState} from 'react'
import styled from 'styled-components/native'
import Carousel, {PaginationLight} from 'react-native-x-carousel'
import AccountDetails from './AccountView'
import {Dimensions, Text} from 'react-native'
import {default as TCDot} from '../../../Intro/Dot'

const {width} = Dimensions.get('window')

const Carousal = ({data, onSwipe}: {data: any; onSwipe: any}) => {
  const [selectedIndex, setSelectedIndex] = useState(1)
  return (
    <Container>
      {data[0] === 1 && (
        <Carousel
          pagination={PaginationLight}
          renderItem={(item: any, index: number) => (
            <Card key={index}>
              <AccountDetails item={item} />
            </Card>
          )}
          data={data}
          loop
        />
      )}
      {data[0] !== 1 && (
        <Carousel
          onPage={({current}: {current: number}) => {
            setSelectedIndex(current)
            onSwipe(current)
          }}
          pagination={PaginationLight}
          renderItem={(item: any, index: number) => (
            <Card key={index}>
              <AccountDetails item={item} />
            </Card>
          )}
          data={data}
          loop
        />
      )}
      <DotWrapper>
        {data[0] !== 1 &&
          data?.map((item, index) => (
            <TCDot
              key={index}
              isActive={selectedIndex === index + 1}
              hasRounded
            />
          ))}
      </DotWrapper>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`
const DotWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

const Card = styled.View`
  width: ${width * 0.9}px;
  flex: 1;
`

export default Carousal
