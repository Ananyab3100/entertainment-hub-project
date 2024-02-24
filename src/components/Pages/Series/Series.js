import axios from "axios";
import { useState,useEffect } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import '../Series/Series.css'
import Genres from "../../Genres";
import useGenres from "../../hooks/useGenre";

function Series() {

    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages ,setnumOfPages] = useState();
    const [selectedGenres,setselectedGenres] = useState([]);
    const [genres,setGenres] =useState([]);
    const genreforURL = useGenres(selectedGenres);
    console.log(selectedGenres);


    
  
        useEffect(()=>{
         
            const fetchSeries = async () => {
                try {
                  const { data } = await axios.get(
                    'https://api.themoviedb.org/3/discover/tv',
                    {
                      params: { language: 'en-US', page: page , with_genres: genreforURL},
                      headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTEwMTkzN2M5MTIzMTc3M2RlMjY5MWRhZjVmYWEwYSIsInN1YiI6IjY1YzEyNTUxYmYwOWQxMDE2M2E3YmU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I_hThXwxZ2CGOhlx1cywf8jMzrog3-9yJ81pSzjrpXo',
                        // Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                      },
                    }
                  );
                  // console.log(data.results);
                  setContent(data.results);
                  setnumOfPages(data.total_pages);
                } 
                catch (error) {
                  console.error(error);
                }
              };

          fetchSeries();
        },[page, genreforURL])

    return ( <>
    <span className='pageTitle'>Series</span>
    <Genres 
     setPage={setPage} 
    numOfPages ={numOfPages}
    selectedGenres ={selectedGenres}
    setselectedGenres = {setselectedGenres}
    genres = {genres}
    setGenres = {setGenres}/>

    <div className='series'>
        {
            content && content.map((c)=>{
                return <SingleContent key={c.id}
                 id={c.id} poster={c.poster_path} 
                 title={c.title || c.name} 
                 vote_average ={c.vote_average} 
                 date={c.release_date}/>
            })
        }
    {numOfPages >1 && (
    <CustomPagination setPage={setPage} />
    )}
    </div>
    </> );
}

export default Series;