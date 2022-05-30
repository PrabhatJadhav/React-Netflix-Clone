import axios from "axios";

const youtubeUrl = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: `${process.env.REACT_APP_YT_KEY}`,
  },
});

export default youtubeUrl;
