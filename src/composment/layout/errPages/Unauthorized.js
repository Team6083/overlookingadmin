import React from 'react'
import ErrorPage from './ErrorPage'

export default function Unauthorized() {
    return (
        <div>
            <ErrorPage errCode={401} />
        </div>
    )
}
