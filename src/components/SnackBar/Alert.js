import React from "react";
import {Alert as MuiAlert, Snackbar} from "@mui/material";

function Alert({ open, handleClose, isSuccess }) {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={isSuccess ? "success" : "error"}>
                {isSuccess ? 'Success!' : 'Fail!'}
            </MuiAlert>
        </Snackbar>
    );
}
export default Alert;

