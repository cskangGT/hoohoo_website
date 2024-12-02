import React from 'react'
import i18next from '../../../lang/i18n';
import Community from './Community';
import styled from 'styled-components';
const Image = styled.img`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
function HealthSection() {
    const data: any = i18next.t('community', {returnObjects: true});
  return (
    <Community data={data[1]} index={1} imageWidth={'100%'} >
        
    </Community>
  )
}

export default HealthSection