import React, { useState } from 'react';
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import exportFunctions from "../../../app/actions/films";


const FilmForm = ({filmToUpdate, setFilmPageMode, setUpdatedFilm, setIsSuccess, showMessage, setShowMessage}) => {

    const [film, setFilm] = useState(filmToUpdate);
    const [errors, setErrors] = useState({});

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
        if (!film.director.name.trim()) {
            newErrors.directorName = 'Director name is required';
        }
        if (!film.director.age || isNaN(film.director.age) || film.director.age < 1 || film.director.age > 120) {
            newErrors.directorAge = 'Invalid director age';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRemoveActor = (index) => {
        const updatedActors = [...film.mainActors];
        updatedActors.splice(index, 1);
        setFilm({ ...film, mainActors: updatedActors });
    };

    const handleUpdateFilm = async (entity) => {
        setShowMessage(true);
        try {
            await exportFunctions.fetchUpdateFilms(entity);
            setIsSuccess(true);
            setFilmPageMode(false);
            setUpdatedFilm(entity);
        } catch (error) {
            console.error('Error:', error);
            setIsSuccess(false);
        }
    };

    const handleSubmit = async () => {
        if (validateForm(film)) {
            handleUpdateFilm(film);
        }

    };

    return (
        <form>
            <TextField
                label="Name"
                name="name"
                value={film.name}
                onChange={(e) => setFilm({ ...film, name: e.target.value })}
                isError={errors.name}
            />
            <TextField
                label="Genre"
                name="genre"
                value={film.genre}
                onChange={(e) => setFilm({ ...film, genre: e.target.value })}
                isError={errors.genre}
            />
            <TextField
                label="Release Year"
                name="releaseYear"
                value={film.releaseYear}
                onChange={(e) => setFilm({ ...film, releaseYear: e.target.value })}
                isError={errors.releaseYear}
            />
            {film.mainActors.map((actor, index) => (
                <div key={index}>
                    <TextField
                        label={`Main Actor ${index + 1}`}
                        value={actor.name}
                        onChange={(e) => {
                            const updatedActors = [...film.mainActors];
                            updatedActors[index] = e.target.value;
                            setFilm({ ...film, mainActors: updatedActors });
                        }}
                    />
                    <Button onClick={() => handleRemoveActor(index)}>Remove</Button>
                </div>
            ))}
            <TextField
                label="Director Name"
                name="directorName"
                value={film.director.name}
                onChange={(e) => setFilm({ ...film, director: { ...film.director, name: e.target.value } })}
                isError={errors.directorName}
            />
            <TextField
                label="Director Age"
                name="directorAge"
                value={film.director.age}
                onChange={(e) => setFilm({ ...film, director: { ...film.director, age: e.target.value } })}
                isError={errors.directorAge}
            />
            <Button onClick={handleSubmit}>Update Film</Button>
        </form>
    );
};

export default FilmForm;
