import React from 'react';
// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => {
    return (
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    )
};

export default MyButton;