import axios from "axios";

// Function to get a random trending movie
export async function getTrendingMovie(req, res) {
  console.log("Controller passed");
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data;
    console.log("Data:", data);

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trending movies found" });
    }

    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Function to get movie trailers by ID
export async function getMovieTrailers(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data;
    console.log("Trailers data:", data);

    res.json({ success: true, trailers: data.results || [] });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    console.error("Error fetching trailers:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Function to get movie details by ID
export async function getMovieDetails(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data;
    console.log("Movie details:", data);

    res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    console.error("Error fetching details:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Function to get similar movies by ID
export async function getSimilarMovies(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data;
    console.log("Similar movies data:", data);

    res.json({ success: true, movies: data.results || [] });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    console.error("Error fetching similar movies:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Function to get movies by category
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;

  // Define valid movie categories to prevent errors
  const validCategories = ["now_playing", "popular", "top_rated", "upcoming"];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ success: false, message: "Invalid category" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data;
    console.log("Category movies data:", data);

    res.status(200).json({ success: true, content: data.results || [] });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    console.error("Error fetching category movies:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
