import config from 'config';
import axios from "../../misc/requests";
import {filmsP1, filmsP2} from "../mocks/filmsMock";

const {FILMS_SERVICE} = config;

const addFilm = async (filmBody) => {
    console.log(filmBody.name)
    return axios.post(
        `${FILMS_SERVICE}/api/v1/films`,
        {
            name: filmBody.name,
            genre: filmBody.genre,
            releaseYear: filmBody.releaseYear,
            mainActors: filmBody.mainActors,
            director: filmBody.director
        },
    );
};

const fetchAddFilm = async (filmBody) => {
    try {
        return await addFilm(filmBody);
    } catch (error) {
        console.error('Error:', error);

    }
};

const getFilms = async (page, filmFilter) => {
    console.log(filmFilter);
    const response = await axios.post(
        `${FILMS_SERVICE}/api/v1/films/_list?page=${page}`,
        !!filmFilter ? {
            name: filmFilter.name,
            genre: filmFilter.genre
        } : {}
    );
    console.log(response);
    return response;
};

const fetchFilms = async (currentPage, filmFilter) => {
    try {
        return await getFilms(currentPage, filmFilter);
    } catch (error) {
        console.error('Error:', error);
        return {
            films: (currentPage === 0 ? filmsP1 : filmsP2),
            totalPages: 2
        };
    }
};

const deleteFilm = async (id) => {
    return axios.delete(
        `${FILMS_SERVICE}/api/v1/films/${id}`,
    );
};

const fetchDeleteFilm = async (film, currentPage) => {
    try {
        return await deleteFilm(film.id);
    } catch (error) {
        console.error('Error:', error);
        const updatedFilmsP1 = filmsP1.filter(item => item.id !== film.id);
        const updatedFilmsP2 = filmsP2.filter(item => item.id !== film.id);
        return {
            films: (currentPage === 0 ? updatedFilmsP1 : updatedFilmsP2),
            totalPages: 2
        };
    }
};

const updateFilms = async (filmBody) => {
    return axios.put(
        `${FILMS_SERVICE}/api/v1/films/${filmBody.id}`,
        {
            name: filmBody.name,
            genre: filmBody.genre,
            releaseYear: filmBody.releaseYear,
            mainActors: filmBody.mainActors,
            director: filmBody.director
        },
    );
};

const fetchUpdateFilms = async (film) => {
    try {
        return await updateFilms(film);
    } catch (error) {
        console.error('Error:', error);
    }
};

const exportFunctions = {
    fetchFilms,
    fetchDeleteFilm,
    fetchUpdateFilms,
    fetchAddFilm,
};

export default exportFunctions;