import { useIntl } from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import filmsFunctions from "../../../app/actions/films";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import Dialog from "../../../components/Dialog";
import SuccessAlert from "../../../components/SnackBar";
import {useNavigate} from "react-router-dom";
import * as pages from "../../../constants/pages";
import pageURLs from "../../../constants/pagesURLs";
import AddIcon from '@mui/icons-material/Add';
import useStyles from "../../classes/Classes";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from "../../../components/TextField";

function Films({setFilm, setFilmPageMode}) {

    const filmFilterDto = {
        name: '',
        genre: '',
    };

    const [films, setFilms] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [failDeletingFilm, setFailDeletingFilm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filmFilter, setFilmFilter] = useState(() => {
        const storedFilter = localStorage.getItem('filmFilter');
        try {
            return storedFilter ? JSON.parse(storedFilter) : filmFilterDto;
        } catch (error) {
            console.error('Error parsing stored filter:', error);
            return filmFilterDto;
        }
    });


    const classes = useStyles();
    const navigate = useNavigate();

    const { formatMessage } = useIntl();

    const getFilmsByPage = async (currentPage, filmFilter) => {
        saveFilmFilterToLocalStorage(filmFilter)
        console.log(filmFilter)
        try {
            const {films, totalPages} =
                await filmsFunctions.fetchFilms(currentPage, filmFilter);
            setFilms(films);
            console.log(films);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
        getFilmsByPage(page, filmFilter);
    };

    function handleAddFilm() {
        setFilmPageMode(true);
        navigate(pageURLs[pages.filmDetailsPage]);
    }

    const handleDeleteButton = (entity) => {
        setSelectedEntity(entity);
        setShowDeleteButton(true);
    };

    const handleDeleteFilm = async (entity) => {
        try {
            await filmsFunctions.fetchDeleteFilm(entity);
            setShowConfirmationDialog(false);
            setShowSuccessMessage(true);
            getFilmsByPage(currentPage);
        } catch (error) {
            console.error('Error:', error);
            setFailDeletingFilm(true)
            films.removeItem(entity);
        }
    };

    useEffect(() => {
        getFilmsByPage(currentPage);
    }, []);

    const closeConfirmationDialog = () => {
        setShowConfirmationDialog(false);
        setSelectedEntity(null);
        setFailDeletingFilm(false);
    };

    const handleClickOnFilm = (film) => {
        setFilm(film);
        navigate(pageURLs[pages.filmDetailsPage]);
    };

    const isFilmFilterExist = () => {
        return filmFilter.name !== filmFilterDto.name ||
                filmFilter.genre !== filmFilterDto.genre;
    };

    const handelRemoveFilter = (page)=> {
        saveFilmFilterToLocalStorage(filmFilterDto);
        setFilmFilter(filmFilterDto);
        setShowFilter(false);
        getFilmsByPage(page);
    };

    const savePageToLocalStorage = (currentPage) => {
        localStorage.setItem('page',currentPage);
    };

    const saveFilmFilterToLocalStorage = (filter) => {
        localStorage.setItem('filmFilter', JSON.stringify(filter));
    };

    return (
        <Typography>
            <div>
                <div>
                    <div className={classes.rightPosition}>
                        <Button startIcon={<AddIcon/>}
                                onClick={() => handleAddFilm()}></Button>
                    </div>
                    <div className={classes.rightPosition}>
                        <Button startIcon={<FilterAltIcon/>}
                                onClick={() => setShowFilter(!showFilter)}></Button>
                        { isFilmFilterExist() &&
                            <Button onClick={() => handelRemoveFilter(currentPage)}>Remove Filter</Button>
                        }
                    </div>
                    <div>
                        {showFilter && (
                            <>
                                <TextField
                                    label="By genre"
                                    name="genre"
                                    onChange={(e) =>  setFilmFilter({ ...filmFilter, genre: e.target.value})}
                                />
                                <TextField
                                    label="By name"
                                    name="name"
                                    onChange={(e) =>  setFilmFilter({ ...filmFilter, name: e.target.value})}
                                />
                                <Button onClick={() => getFilmsByPage(currentPage, filmFilter)}></Button>
                            </>
                        )}
                    </div>
                    <h2>{formatMessage({id: 'title'})}</h2>
                    <ul>
                        <>
                            {!!films && films.map((film, index) => (
                                <li key={index}
                                    onMouseOver={() => handleDeleteButton(film)}
                                    onMouseLeave={() => setShowDeleteButton(false)}
                                >
                                 <span onClick={() => handleClickOnFilm(film)}>
                                     <strong>Title:</strong> {film.name}, <strong>Genre:</strong> {film.genre}
                                 </span>

                                    {showDeleteButton && film === selectedEntity &&
                                        <Button onClick={() => setShowConfirmationDialog(true)}>Delete</Button>
                                    }

                                </li>
                            ))}
                        </>
                        <Dialog
                            open={showConfirmationDialog}
                            onClose={closeConfirmationDialog}
                            onConfirm={handleDeleteFilm}
                            entity={selectedEntity}
                            isFail={failDeletingFilm}
                        />
                        <SuccessAlert open={showSuccessMessage} handleClose={() => setShowSuccessMessage(false)}/>
                    </ul>
                </div>
                <div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        </Typography>
    );
}

export default Films;
