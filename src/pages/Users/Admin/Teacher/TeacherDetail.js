import React from 'react'
import { useParams } from 'react-router-dom'

function TeacherDetail() {
    const {id} = useParams()

  return (
    <div>{id}</div>
  )
}

export default TeacherDetail