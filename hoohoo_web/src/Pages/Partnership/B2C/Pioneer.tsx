import React from 'react';
import i18next from 'i18next';
import Community from './Community';

function Pioneer() {
    const data : any = i18next.t('pioneer', { returnObjects: true });
    return (
        <Community data={data} flip={false}/>
    )
}
export default Pioneer;