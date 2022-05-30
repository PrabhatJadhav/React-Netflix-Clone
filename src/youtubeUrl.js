import axios from "axios";

const KEY = "AIzaSyBI9utABVMX7VUCoUuYC6uIPHrGSxbhjB8";

const youtubeUrl = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});

export default youtubeUrl;
