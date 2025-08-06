import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

import Home from './components/Home';
import Settings from './components/Settings';
import Announcement from './components/Announcement';
import Students from './components/Students';
import Assignments from './components/Assignments';
import Quizzes from './components/Quizzes';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#1F3B66', minHeight: '100vh' }} className="min-h-screen bg-gray-50 text-gray-800">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      )}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/announcements',
        element: <Announcement />
      },
      {
        path: '/students',
        element: <Students />
      },
      {
        path: '/assignments',
        element: <Assignments />
      },
      {
        path: '/quizzes',
        element: <Quizzes />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;