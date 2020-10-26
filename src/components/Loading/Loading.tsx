import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import './Loading.scss'

export const Loading: React.FC = () => {
    return (
        <div className="loading-center">
            <CircularProgress />
        </div>
    )
}