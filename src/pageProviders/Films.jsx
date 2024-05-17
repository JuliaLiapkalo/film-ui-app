import React from 'react';

import PageContainer from './components/PageContainer';
import Film from "../pages/films";


const Films = (props) => {
    return (
        <PageContainer>
            <Film {...props} />
        </PageContainer>
    );
};

export default Films;