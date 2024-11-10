import React from 'react'
import { useParams } from 'react-router-dom'

function AdminStudentDetail() {
    const {id} = useParams()

  return (
    <div>{id}</div>
  )
}

export default AdminStudentDetail
