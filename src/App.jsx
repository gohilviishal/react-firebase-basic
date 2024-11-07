import { useEffect, useState } from "react";
import Auth from "./components/auth";
import { auth, db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDate, setNewMovieDate] = useState(0);
  const [newMovieAward, setNewMovieAward] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        date: newMovieDate,
        receivedAnAward: newMovieAward,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };
  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie Title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewMovieDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieAward}
          onChange={(e) => setNewMovieAward(e.target.checked)}
        />
        <label>Received An Award</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnAward ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.date}</p>
            <button onClick={() => onDelete(movie.id)}>Delete Movie</button>
            <input
              placeholder="New Title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
