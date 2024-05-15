import React from 'react';
import DialogMui from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "../Button";

const maxWidthVariants = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const Dialog = ({open, onClose, onConfirm, entity, isFail}) => {
  return (
      <DialogMui open={open} onClose={onClose}>
        <DialogTitle>Delete Entity</DialogTitle>

        {isFail ? (
            <>
            <DialogContent>
              Fail!
            </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </>
        ) : (
            <>
              <DialogContent>
                Are you sure you want to delete this ?
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => onConfirm(entity)} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </>
        )}

      </DialogMui>
  );
};
export default Dialog;
