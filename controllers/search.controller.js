import axios from "axios";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const results = response.data.results; // Correctly access results
    if (!results || results.length === 0) {
      return res.status(404).send(null); // Handle empty results
    }

    // Update user search history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: results[0].id,
          image: results[0].profile_path,
          title: results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.log("Error in SearchPerson Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const results = response.data.results; // Correctly access results
    if (!results || results.length === 0) {
      return res.status(404).send(null); // Handle empty results
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: results[0].id,
          image: results[0].poster_path,
          title: results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.log("Error in SearchMovie Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        params: {
          language: "en-US",
          api_key: "e67103b50af1d2493e637dfcbee08bdc",
        },
      }
    );

    const results = response.data.results; // Correctly access results
    if (!results || results.length === 0) {
      return res.status(404).send(null); // Handle empty results
    }

    // Update user search history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: results[0].id,
          image: results[0].poster_path,
          title: results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: results });
  } catch (error) {
    console.log("Error in SearchTv Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res.status(200).json({ success: true, message: "Item removed successfully" });  
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
