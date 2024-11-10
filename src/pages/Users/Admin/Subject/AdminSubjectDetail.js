import React from 'react'
import { useParams } from 'react-router-dom'

function AdminSubjectDetail() {
    const { id } = useParams()

    return (
        <div>{id}</div>
    )
}

export default AdminSubjectDetail