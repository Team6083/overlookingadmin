import React from 'react'
import ErrorPage from './ErrorPage'

export default function Forbidden() {
    return (
        <div>
            <ErrorPage errCode={403} />
        </div>
    )
}
