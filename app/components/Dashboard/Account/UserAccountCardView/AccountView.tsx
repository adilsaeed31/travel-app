import React from 'react'
import {View, Text as TextView} from 'react-native'
import styled from 'styled-components/native'
import {AccountsBg, Share} from '@Assets'
import {normalize, vh, vw} from '@Utils'
import {useTranslation} from 'react-i18next'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const Container = styled(View)`
  flex: 1;
  border: 0.961652px solid #f1f1f1;
  border-radius: ${normalize(23)}px;
`

const FirstSection = styled(View)`
  flex: 1;
  height: 87px;
  justify-content: center;
  align-items: center;
  position: relative; /* Ensure the background SVG stays behind the content */
`

const BackgroundSvg = styled(AccountsBg)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const SectionWrapper = styled(View)`
  flex: 1;
  height: 57px;
  justify-content: center;
  align-items: center;
  padding: ${normalize(10)}px;
  flex-direction: row;
`

const Divider = styled(View)<{width?: string}>`
  width: ${({width}) => (width ? width : '100%')};
  height: 1px;
  align-self: center;
  background-color: #e8e8e8;
`

const LeftSection = styled(View)`
  flex: 1;
`

const RightSection = styled(View)<{flexGrow?: number}>`
  flex: 1;
  flex-grow: ${({flexGrow}) => (flexGrow ? flexGrow : 0.7)};
  align-items: flex-end;
`

const TextWrapper = styled(View)<{flexDirection?: string}>`
  flex-direction: ${({flexDirection}) =>
    flexDirection ? flexDirection : 'column'};
`

interface TextProps
  extends Omit<React.ComponentProps<typeof TextView>, 'style'> {
  weight?: number
  size?: number
  lineHeight?: number
  color?: string
  alignSelf?: string
}

const Text = styled(TextView)<TextProps>`
  font-family: 'Co Text';
  align-self: ${({alignSelf}) => (alignSelf ? alignSelf : 'flex-start')};
  font-style: normal;
  font-weight: ${({weight}) => (weight ? weight : 400)};
  font-size: ${({size}) => (size ? size : 12)}px;
  line-height: ${({lineHeight}) => (lineHeight ? lineHeight : 15)}px;
  color: ${({color}) => (color ? color : '#343D45')};
`

const AccountDetails: React.FC = ({item}: any) => {
  const {t} = useTranslation()

  return (
    <Container>
      <FirstSection>
        <BackgroundSvg width={'100%'} />
        <Text alignSelf={'center'} lineHeight={normalize(17)} color={'#6B7278'}>
          Current Account
        </Text>
        <TextWrapper flexDirection={'row'}>
          {item !== 1 ? (
            <Text lineHeight={normalize(27)} weight={700} size={normalize(22)}>
              {parseInt(item?.balance)}
            </Text>
          ) : (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={vw(100)} height={vh(18)} />
            </SkeletonPlaceholder>
          )}
          {item !== 1 && (
            <Text
              alignSelf={'center'}
              lineHeight={normalize(18)}
              weight={300}
              size={normalize(12)}>
              {(item?.balance % 1).toFixed(2).slice(1)} {item?.currency_code}
            </Text>
          )}
        </TextWrapper>
      </FirstSection>
      <Divider />
      <SectionWrapper>
        <LeftSection>
          <Text color={'#6B7278'}>{t('Dashboard:accountName')}</Text>
          <TextWrapper>
            {item !== 1 ? (
              <Text>{item?.name}</Text>
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item width={vw(100)} height={vh(18)} />
              </SkeletonPlaceholder>
            )}
          </TextWrapper>
        </LeftSection>
        <RightSection>
          <TextWrapper>
            <Text color={'#6B7278'}>{t('Dashboard:accountNumber')}</Text>
          </TextWrapper>
          <TextWrapper>
            {item !== 1 ? (
              <Text>{item?.number}</Text>
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item width={vw(150)} height={vh(18)} />
              </SkeletonPlaceholder>
            )}
          </TextWrapper>
        </RightSection>
      </SectionWrapper>
      <Divider width={'90%'} />
      <SectionWrapper>
        <LeftSection>
          <TextWrapper>
            <Text color={'#6B7278'}>{t('Dashboard:IBAN')}</Text>
          </TextWrapper>
          <TextWrapper>
            {item !== 1 ? (
              <Text>{item?.iban}</Text>
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item width={vw(150)} height={vh(18)} />
              </SkeletonPlaceholder>
            )}
          </TextWrapper>
        </LeftSection>
        <RightSection flexGrow={0.4}>
          <Share />
        </RightSection>
      </SectionWrapper>
    </Container>
  )
}

export default AccountDetails
