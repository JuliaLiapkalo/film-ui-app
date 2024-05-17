import React, { useState } from 'react';
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import films from "../../../app/actions/films";
import {useNavigate} from "react-router-dom";
import {filmsPage} from "../../../constants/pages";
import Alert from "../../../components/SnackBar";

const FilmForm = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const filmData = {
        name: '',
        genre: '',
        releaseYear: '',
        mainActors: [],
        director: {
            name: '',
            age: ''
        }
    };
    const [film, setFilm] = useState(filmData);

    const validateForm = (film) => {
        const newErrors = {};

        if (!film.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!film.genre.trim()) {
            newErrors.genre = 'Genre is required';
        }
        if (!film.releaseYear || isNaN(film.releaseYear) ||
            film.releaseYear < 1900 ||
            film.releaseYear > new Date().getFullYear()) {
            newErrors.releaseYear = 'Invalid release year';
        }
       if (!film.director || !film.director.name.trim()) {
            newErrors.directorName = 'Director name is required';
       }
       if (!film.director.age || isNaN(film.director.age) || film.director.age < 1 || film.director.age > 120) {
            newErrors.directorAge = 'Invalid director age';
       }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCreateFilm = async (entity) => {
        try {
            await films.fetchAddFilm(entity);
            setIsSuccess(true);
            setShowMessage(true);
            navigate(filmsPage);
        } catch (error) {
            console.error('Error:', error);
            setIsSuccess(false);
            setShowMessage(true);
        }
    };

    const handleSubmit = () => {
        if (validateForm(film)) {
            handleCreateFilm(film)
        }
    };

    return (
        <form>
            <TextField
                label="Name"
                name="name"
                onChange={(e) => setFilm({ ...film, name: e.target.value })}
                isError={errors.name}
            />
            <TextField
                label="Genre"
                name="genre"
                onChange={(e) => setFilm({ ...film, genre: e.target.value })}
                isError={errors.genre}
            />
            <TextField
                label="Release Year"
                name="releaseYear"
                onChange={(e) => setFilm({ ...film, releaseYear: e.target.value })}
                isError={errors.releaseYear}
            />
            <TextField
                label="Main actors (separete it by coma)"
                name="mainActors"
                onChange={(e) => setFilm({ ...film, mainActors: e.target.value.split(',').map(item => item.trim()) })}
                isError={errors.mainActors}
            />
            <TextField
                label="Director Name"
                name="directorName"
                onChange={(e) => setFilm({ ...film, director: { ...film.director, name: e.target.value } })}
                isError={errors.directorName}
            />
            <TextField
                label="Director Age"
                name="directorAge"
                onChange={(e) => setFilm({ ...film, director: { ...film.director, age: e.target.value } })}
                isError={errors.directorAge}
            />
            <Button onClick={handleSubmit}>Create Film</Button>
            <Alert open={showMessage} handleClose={() => setShowMessage(false)} isSuccess={isSuccess}/>
        </form>
    );
};

export default FilmForm;