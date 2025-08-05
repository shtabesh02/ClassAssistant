import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadallquizzes } from '../../store/quiz';
import './Quiz.css'
function Quiz() {
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quiz.quiz);

  useEffect(() => {
    dispatch(loadallquizzes());
  }, [dispatch])
  return (
    <div className="quizz">
      <h1>Upcoming Quizzes</h1>

      {quizzes.length > 0 ? (
        quizzes.map(quiz => (
          <div key={quiz.id}><span>{quiz.title}</span><span> <label htmlFor="">Due Date: </label>
            { new Date(quiz.due_date).toLocaleDateString()} - { new Date(quiz.due_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </span><span>{quiz.description}</span></div>
        ))
      ) : (
        <p>There is not quiz</p>
      )}

    </div>
  )
}

export default Quiz