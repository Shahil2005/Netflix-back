import axios from "axios";

export async function getTrendingTv(req, res) {
  console.log("Controller passed");
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day",
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data; // Extract the data property
    console.log("Data:", data); // Log data for debugging
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error fetching trending Tv:", error.message); // Log error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data; // Extract the data property
    console.log("Tv data:", data); // Log data for debugging

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).send(null);
    } else {
      console.error("Error fetching Tv trailers:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get( 
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data; // Extract the data property
    console.log("Tv details :", data); // Log data for debugging

    res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).send(null);
    } else {
      console.error("Error fetching Tv details:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
export async function getSimilarTvs(req, res) {
  const { id } = req.params;

  try {
    const response = await axios.get( 
      `https://api.themoviedb.org/3/tv/${id}/similar`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data; // Extract the data property
    console.log("Similar Tv data:", data); // Log data for debugging

    res.json({ success: true, movies: data });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).send(null);
    } else {
      console.error("Error fetching similar Tv:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
export async function getTvsByCategory(req, res) {
  const { category } = req.params;

  try {
    const response = await axios.get( 
      `https://api.themoviedb.org/3/tv/${category}`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const data = response.data; // Extract the data property
    console.log("Category Tv data:", data); // Log data for debugging

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).send(null);
    } else {
      console.error("Error fetching category movies:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}