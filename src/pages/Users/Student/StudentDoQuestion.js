import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../service/axios_helper';
import { useLocation, useParams } from 'react-router-dom';

// Function to convert ISO 8601 duration to seconds
const parseISODuration = (duration) => {
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const matches = duration.match(regex);
  if (!matches) return 0; // Return 0 if the format is invalid

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  return (hours * 3600) + (minutes * 60) + seconds;
};

function StudentDoQuestion() {
  const { id } = useParams();
  const location = useLocation();
  const [questions, setQuestions] = useState(null);
  const [submission, setSubmission] = useState({
    assignmentId: parseInt(id, 10),
    answerIds: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Parse the timer from location state
  const initialTimer = parseISODuration(location.state);
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsResponse = await axiosInstance.get(
          `api/questions/assignment/${parseInt(id, 10)}`
        );
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      handleSubmit(); // Automatically submit when timer hits 0
    }
  }, [timer]);

  const handleAnswerChange = (questionId, answerId) => {
    const updatedAnswerIds = submission.answerIds.filter(
      (id) => !questions.find((question) => question.id === questionId && question.answerDtoList.some(answer => answer.id === id))
    );
    updatedAnswerIds.push(answerId);
    setSubmission({ ...submission, answerIds: updatedAnswerIds });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default only if event is passed
    setSubmitting(true);

    try {
      await axiosInstance.post('api/submissions/add', submission);
      setSubmissionSuccess(true);
    } catch (error) {
      setSubmissionError(error.response?.data?.message || 'Lỗi khi gửi bài.');
      console.error("Error submitting answers:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!questions) {
    return <div>Đang tải câu hỏi...</div>;
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <h1>Bài kiểm tra</h1>
      <h2>Thời gian còn lại: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            {question.answerDtoList.map((answer) => (
              <div key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={answer.id}
                    checked={submission.answerIds.includes(answer.id)}
                    onChange={() => handleAnswerChange(question.id, answer.id)}
                  />
                  {answer.answer}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Gửi bài'}
        </button>
      </form>
      {submissionSuccess && <p style={{ color: 'green' }}>Gửi bài thành công!</p>}
      {submissionError && <p style={{ color: 'red' }}>{submissionError}</p>}
    </div>
  );
}

export default StudentDoQuestion;
