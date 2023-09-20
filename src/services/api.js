import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2U0NWY4N2FjMjMwMjUyMjJmYTA3ODM1OGE2NmYwMCIsInN1YiI6IjYxYWEwNWFmYzVjMWVmMDA5NGFlNjFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTVTwDIb2HHtsUxeIxctpyhuEI6sN9_Fj7Fc7rkqZqQ";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
