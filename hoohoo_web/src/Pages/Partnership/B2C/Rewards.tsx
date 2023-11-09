import React from 'react';
import i18next from 'i18next';
import Community from './Community';




function Rewards() {
    const data : any = i18next.t('rewards', { returnObjects: true });

    return (
        <Community data={data} flip={true}/>
    )
}
export default Rewards;