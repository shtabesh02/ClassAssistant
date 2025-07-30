import Announcement from "./Announcement"
import Assignment from "./Assignment"
import Quiz from "./Quiz"
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to your Class Assistant</h1>
      <div className="home-grid">
        <div className="home-section">
          <Quiz />
        </div>
        <div className="home-section">
          <Assignment />
        </div>
        <div className="home-section">
          <Announcement />
        </div>
      </div>
    </div>

  )
}

export default Home