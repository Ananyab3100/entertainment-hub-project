import axios from "axios";
import { useState,useEffect } from "react";
import { Button, Tabs,Tab, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

function Search() {
  const [type , setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();


  

  useEffect(()=>{

    const fetchSearch = async() => {
        // console.log(searchText);
        try {
            const { data } = await axios.get(
              'https://api.themoviedb.org/3/search/multi',
              {
                params: { language: 'en-US', page: page , query: searchText,media_type: type === 0 ? 'movie' : 'tv'},
                headers: {
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTEwMTkzN2M5MTIzMTc3M2RlMjY5MWRhZjVmYWEwYSIsInN1YiI6IjY1YzEyNTUxYmYwOWQxMDE2M2E3YmU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I_hThXwxZ2CGOhlx1cywf8jMzrog3-9yJ81pSzjrpXo',
                  // Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
              }
            );
            console.log(data);
            setContent(data.results);
            setNumOfPages(data.total_pages);
          } 
          catch (error) {
            console.error(error);
          }
      }

    fetchSearch();
  },[page,searchText,type])


    return (<>
    <div className='search' style={{display:'flex' , margin: '15px 0'}}>
    <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

   <Button variant="contained" style ={{marginLeft : 10}}><SearchIcon /> </Button>
    </div>
    <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>


        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
       {content.length === 0 && searchText && (
  <h2>{type ? 'No Series Found' : 'No Movies Found'}</h2>
)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>  );
}

export default Search;