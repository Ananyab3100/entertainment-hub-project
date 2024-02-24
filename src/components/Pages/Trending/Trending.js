import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import '../Trending/Trending.css';
import CustomPagination from "../../Pagination/CustomPagination";


function Trending() {
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);

    
    
    useEffect(()=>{
        const fetchTrending = async () => {
            try {
              const { data } = await axios.get(
                'https://api.themoviedb.org/3/movie/top_rated',
                {
                  params: { language: 'en-US', page: '1' },
                  headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTEwMTkzN2M5MTIzMTc3M2RlMjY5MWRhZjVmYWEwYSIsInN1YiI6IjY1YzEyNTUxYmYwOWQxMDE2M2E3YmU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I_hThXwxZ2CGOhlx1cywf8jMzrog3-9yJ81pSzjrpXo',
                    // Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                  },
                }
              );
              // console.log(data.results);
              setContent(data.results);
            } catch (error) {
              console.error(error);
            }
          };


    fetchTrending();
    },[page])



    return ( <>
    <span className='pageTitle'>Trending</span>
    <div className='trending'>
        {
            content && content.map((c)=>{
                return <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} vote_average ={c.vote_average} date={c.release_date}/>
            })
        }

    <CustomPagination setPage={setPage}/>
    </div>
    </> );
    
}

export default Trending;