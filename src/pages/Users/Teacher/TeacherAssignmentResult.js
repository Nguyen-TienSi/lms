import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function TeacherAssignmentResult() {
  const {id} = useParams()
  const [submissions, setSubmissions] = useState()


  return (
    <div>

    </div>
  )
}

export default TeacherAssignmentResult
