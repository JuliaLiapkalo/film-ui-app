import { useIntl } from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import Button from "../../../components/Button";
import {useNavigate} from "react-router-dom";
import {filmsPage} from "../../../constants/pages";
import FilmUpdateForm from "../components/FilmUpdateForm";
import useStyles from "../../classes/Classes";
import CreateIcon from '@mui/icons-material/Create';
import CreateFilmForm from "../../films/components/CreateFilmForm";
import Alert from "../../../components/SnackBar";


function FilmsDetails({film, setFilm, filmPageMode, setFilmPageMode}) {

    const classes = useStyles();
    const [filmToUpdate, setFilmToUpdate] = useState(film);
    const [isSuccess, setIsSuccess] = useState();
    const [showMessage, setShowMessage] = useState();
    const navigate = useNavigate();

    const handleNavigateToFilmsList = () => {
        setFilmPageMode(false);
        setFilm(null);
        navigate(filmsPage);
    };

    const handleCancelButton = () => {
        setFilmPageMode(false);
    };

    return (
        <Typography>
            {filmPageMode ? (
                <>
                    {film ? (
                        <>
                            <h1>Update film</h1>
                            <FilmUpdateForm filmToUpdate={filmToUpdate} setFilmPageMode={setFilmPageMode} setUpdatedFilm={setFilm}
                            setIsSuccess={setIsSuccess} showMessage={showMessage} setShowMessage={setShowMessage}/>
                            <Button onClick={() => handleCancelButton()}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <CreateFilmForm/>
                            <Button onClick={() => handleNavigateToFilmsList()}>
                                Cancel
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Button onClick={handleNavigateToFilmsList}>
                        Back to films list
                    </Button>
                    <div className={classes.container}>
                        <div className={classes.filmDetails}>
                            <div className={classes.rightPosition}>
                                <Button startIcon={<CreateIcon/>} onClick={() => setFilmPageMode(true)}></Button>
                            </div>
                            <h2 className={classes.filmDetailsHeading}>Film Details</h2>
                            <ul className={classes.filmDetailsList}>
                                <li>
                                    <strong>Name:</strong>
                                    {film.name}
                                </li>
                                <li>
                                    <strong>Genre:</strong>
                                    {film.genre}
                                </li>
                                <li>
                                    <strong>Release Year:</strong> {film.releaseYear}
                                </li>
                                <li>
                                    <strong>Main Actors:</strong>
                                    <ul>
                                        {film.mainActors.map(actor => (
                                            <li key={actor.id}>{actor.name}</li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <strong>Director:</strong>
                                    <ul>
                                        <li><strong>Name:</strong> {film.director.name}</li>
                                        <li><strong>Age:</strong> {film.director.age}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <Alert open={showMessage} handleClose={() => setShowMessage(false)} isSuccess={isSuccess}/>
                    </div>
                </>
            )}
        </Typography>
    );
}

export default FilmsDetails;
