import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f2f2f2',
    },
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    rightPosition: {
        marginLeft: '90%'
    },
    filmDetails: {
        marginBottom: '20px',
    },
    filmDetailsHeading: {
        marginBottom: '10px',
        color: '#333',
    },
    filmDetailsList: {
        listStyleType: 'none',
        padding: 0,
    },
    filmDetailsListItem: {
        marginBottom: '5px',
    },
    filmDetailsListItemStrong: {
        fontWeight: 'bold',
        marginRight: '5px',
    },
}));

export default useStyles;