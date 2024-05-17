import React from 'react';

import PageContainer from './components/PageContainer';
import FilmsDetailsPage from "../pages/filmsDetails";

const FilmDetails = (props) => {
  return (
    <PageContainer>
      <FilmsDetailsPage {...props} />
    </PageContainer>
  );
};

export default FilmDetails;
