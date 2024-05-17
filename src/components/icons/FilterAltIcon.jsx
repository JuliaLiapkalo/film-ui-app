import React from 'react';
import useTheme from 'misc/hooks/useTheme';

import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterAltIconCustom = ({
                           color = 'default', // default | header | error | success | warning | info | <string>
                           size = 32,
                       }) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <FilterAltIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
                color: actualColor,
            }}
        />
    );
};

export default FilterAltIconCustom;