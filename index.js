import express from "express";

const app = express();

const PORT = 8000;

// //? Convert received or sent data to json
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

// app.get("/hello/:name", (req, res) => {
//   const userName = req.params.name; // Capture the dynamic part of the URL
//   return res.status(200).send(userName); // Send it back in the response
// });

app.get("/hello", (req, res) => {
  return res.status(200).send("Hello Yadav");
});

let movieList = [];

app.post("/movies/add", (req, res) => {
  const newMovie = req.body;

  //add new movie to list
  movieList.push(newMovie);
  return res.status(201).send({ message: "Movie is added successfullly" });
});

app.get("/movies/list", (req, res) => {
  return res.status(200).send(movieList);
});

app.delete("/movie/delete", (req, res) => {
  //   extract movie name from req.body
  const movieNameToBeDeleted = req.body.name;

  //   find movie with provided name on  movie list
  const requiredMovie = movieList.find((item) => {
    if (item.name === movieNameToBeDeleted) {
      return item;
    }
  });

  //    if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  //   remove movie from list
  const newMovieList = movieList.filter((item, index, array) => {
    if (item.name !== movieNameToBeDeleted) {
      return item;
    }
  });

  //   replace movie list with new movie list
  movieList = structuredClone(newMovieList);

  //   send response
  return res.status(200).send({ message: "Movie is deleted successfully," });
});