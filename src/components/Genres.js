import axios from "axios";
import { useEffect } from "react";
import { Chip } from "@mui/material";

function Genres(props) {

    const {setPage, selectedGenres,setselectedGenres,genres,setGenres} = props;

    const handleAdd =(genre) =>{
      setselectedGenres([...selectedGenres , genre]);
      setGenres(genres.filter((g) => g.id !== genre.id));
      setPage(1);
    }

    const handleRemove = (genre) => {
      setselectedGenres(
        selectedGenres.filter((selected) => selected.id !== genre.id)
      );
      setGenres([...genres, genre]);
      setPage(1);
    };

    
  
        useEffect(()=>{

            const fetchGenres = async () => {
                try {
                  const { data } = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list?language=en',
                    {
                      params: { language: 'en-US', page: '1' },
                      headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTEwMTkzN2M5MTIzMTc3M2RlMjY5MWRhZjVmYWEwYSIsInN1YiI6IjY1YzEyNTUxYmYwOWQxMDE2M2E3YmU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I_hThXwxZ2CGOhlx1cywf8jMzrog3-9yJ81pSzjrpXo',
                        // Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                      },
                    }
                  );
        
                  // console.log(data.genres);
                  setGenres(data.genres);
                  
                } 
                catch (error) {
                  console.error(error);
                }
              };

          fetchGenres();
        },[])



    return ( <>
    <div style={{padding :'6px 0'}}>
    {selectedGenres.map((genre) =>{
        return <Chip label ={genre.name} style={{ margin:2}} color ="primary" size='small' key={genre.id} clickable onClick={()=>{handleRemove(genre)}}/>
      })}
      {genres.map((genre) =>{
        return <Chip label ={genre.name} style={{ margin:2}}  size='small' key={genre.id} clickable onClick ={() =>{handleAdd(genre)}}/>
      })}
    </div>
    </> );
}

export default Genres;