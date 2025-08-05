import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';




function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" sx={{ bgcolor: 'secondary.main' }} elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo + App name */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
         <IconButton edge="start" color="inherit" aria-label="logo">
         <img
            src="../../public/logo.png" 
            alt="logo"
            style={{ width: 32, height: 32 }}
          />
</IconButton>
          <Typography color="success" variant="h6" sx={{ fontWeight: 400, fontFamily: 'monospace' }}>
            ClassAssistant
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="success" sx={{ fontFamily: 'monospace' }} onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="success" sx={{ fontFamily: 'monospace' }} onClick={() => navigate('/about')}>
            About
          </Button>
            <div className='toggle-container'>

                {isLoaded && (
                    <li className="toggle" >
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </div>

        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
