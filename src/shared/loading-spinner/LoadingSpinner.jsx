import React from 'react';
import { CircularProgress }  from '@material-ui/core';

export const LoadingSpinner = (props) => {
    return <div className ="spinner">
        <CircularProgress size={ props.size || 80}/>
    </div>
};
export default LoadingSpinner;
