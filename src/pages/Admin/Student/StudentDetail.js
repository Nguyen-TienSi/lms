import React from 'react'
import { useParams } from 'react-router-dom'

function StudentDetail() {
    const { id } = useParams()

    return (
        <div>{id}</div>
    )
}

export default StudentDetail