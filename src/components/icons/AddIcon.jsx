import React from 'react';
import useTheme from 'misc/hooks/useTheme';

import AddIcon from '@mui/icons-material/Add';

const AddIconCustom = ({
                   color = 'default', // default | header | error | success | warning | info | <string>
                   size = 32,
               }) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <AddIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
                color: actualColor,
            }}
        />
    );
};

export default AddIconCustom;

