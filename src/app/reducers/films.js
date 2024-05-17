import {
    ERROR_RECEIVE_FILM,
    REQUEST_FILMS,
    RECEIVE_FILMS,
} from '../constants/actionTypes';

const initialState = {
    films: [],
    errors: [],
    isFetchingFilms: false,
    isFailedFetchingFilms: false,
};

const convertErrors = errors => errors.map(error => ({
    code: error.code,
    description: error.description,
}));

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_RECEIVE_FILM: {
            return {
                ...state,
                errors: convertErrors(action.payload),
                isFailedFetchingFilms: true
            };
        }

        case RECEIVE_FILMS: {
            const films = action.payload;
            return {
                ...state,
                films: films
            };
        }

        case REQUEST_FILMS: {
            return {
                ...state,
                isFetchingFilms: true,
            };
        }

        default: {
            return state;
        }
    }
}
