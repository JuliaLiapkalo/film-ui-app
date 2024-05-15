import * as pages from './pages';
import config from 'config';

const result = {
  [pages.filmsPage]: `${config.UI_URL_PREFIX}/${pages.filmsPage}`,
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.filmDetailsPage]: `${config.UI_URL_PREFIX}/${pages.filmDetailsPage}`,
};

export default result;
