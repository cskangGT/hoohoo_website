import React from 'react'
import Community from '../B2C/Community'
import Wrapper from '../../../Component/Wrapper/Wrapper'
import { Bg } from './ESG'
import i18next from 'i18next';
export default function UsingB2C() {
    const data : any= i18next.t('usingb2c', { returnObjects: true });
  return (
    <Bg>
        <Wrapper>
        <Community data={data}  />
        </Wrapper>
    </Bg>
    
  )
}