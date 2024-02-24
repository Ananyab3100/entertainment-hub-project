import { img_300, unavailable } from "../config/config";
import "./SingleContent.css";
import { Badge } from "@mui/material";

function SingleContent({
    id, 
    poster,
     title,
     date,
     media_type,
     vote_average,
}) {
    return ( <>
    <div className = 'media'>
    <Badge badgeContent={vote_average} color={vote_average >6 ? "primary" : "secondary"}/>
    <img src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
    <b className = 'title'>{title}</b>
    <span>{media_type ==="tv" ? "TV Series" : "Movie"}</span>
    <span className = 'subTitle'>{date}</span>
    </div>
    </> );
}

export default SingleContent;