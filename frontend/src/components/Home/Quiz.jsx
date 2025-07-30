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
              <div key={quiz.id}><span>{quiz.title}</span><span>{quiz.due_date}</span><span>{quiz.description}</span></div>
            ))
          ):(
            <p>There is not quiz</p>
          )}

    </div>
  )
}

export default Quiz