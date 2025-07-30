import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadassignments } from '../../store/assignment';
import './Assignment.css'
function Assignment() {
    const dispatch = useDispatch();
    const assignments = useSelector(state => state.assignment.assignment);
    useEffect(() => {
      dispatch(loadassignments());
    }, [dispatch])
  return (
    <div className="assignment">
        <h1>Upcoming Assignments</h1>

          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div key={assignment.id}><span>{assignment.title}</span><span>{assignment.due_date}</span><span>{assignment.description}</span></div>
            ))
          ):(
            <p>There is not assignment.</p>
          )}

    </div>
  )
}

export default Assignment