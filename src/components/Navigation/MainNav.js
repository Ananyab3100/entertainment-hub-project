import * as React from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv'; 
import { styled } from '@mui/system';

const StyledBottomNavigation = styled(BottomNavigation)({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: '#2d313a',
  zIndex: 100,
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(value ===0){
      navigate('/')
    }
    else if(value ===1){
      navigate('/movies')
    }
    else if(value ===2){
      navigate('/series')
    }
    else if(value ===3){
      navigate('/search')
    }

  },[value,navigate])
  return (
    <Box sx={{ width: 500 }}>
      <StyledBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color:"white"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="TV series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="Search" icon={<SearchIcon />} />
      </StyledBottomNavigation>
    </Box>
  );
}
