import React from 'react'
import Wrapper from '../../../Component/Wrapper/Wrapper'
import Community from '../B2C/Community'
import { Bg } from './Bag'
import i18next from 'i18next';

export default function Ticket() {
    const data :any = i18next.t('ticket', { returnObjects: true });
  return (
    <Bg>
      <Wrapper>
        <Community data={data}  />
      </Wrapper>
    </Bg>
  )
}