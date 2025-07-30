import { useDispatch, useSelector } from "react-redux";
import { loadannouncements } from "../../store/announcement";
import { useEffect } from "react";
import './Announcement.css'
function Announcement() {
  const dispatch = useDispatch();
  const announcements = useSelector(state => state.announcement.announcement)
  useEffect(() => {
    dispatch(loadannouncements())
  }, [dispatch])
  return (
    <div className="announcements">
      <h1>Announcements</h1>
  
        {announcements.length > 0 ? (
          announcements.map(anmnt => (
            <div key={anmnt.id} className="one-announcement">
                <div><b>{anmnt.subject}</b></div>
                <div>{anmnt.msg}</div>
            </div>
          ))
        ) : (
          <p>There is no announcement.</p>
        )}


    </div>
  )
}

export default Announcement