import { useEffect,useState } from "react";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

function Movies() {
    // eslint-disable-next-line
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages , setnumOfPages] = useState();
    

    
    useEffect(() =>{
        const fetchMovies = async() =>{
            const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`);
           console.log(data);
    
           setContent(data.results);
           setnumOfPages(data.total_pages);
        }
    
        fetchMovies();
    },[])

    return (<>
        <span className='pageTitle'>Movies</span>

    
        <div className='trending'>
        {
            content && content.map((c) =>{
            // return console.log(c);
            return <SingleContent 
            key={c.id} 
            id={c.id} 
            poster={c.poster_path} 
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date}
            media_type ={c.media_type}  
            vote_average={c.vote_average}/>
            })
        }
    </div>
    {numOfPages >1 && (
    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    )}
        </>  );
}

export default Movies;