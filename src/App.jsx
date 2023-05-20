import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { db } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);

  //New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //Update title state
  const [updatedTitle, setUpdatedTitle] = useState("");
  const moviesCollectionRef = collection(db, "movies");


  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
      setMovieList(filteredData);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onsubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
      });

      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
    getMovieList();
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc,{title: updatedTitle});
    getMovieList();
  }

  return (
    <>
      <Auth />
      <div>
        <input type="text" placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input type="number" placeholder='Release date...' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label htmlFor="">Reveived an Oscar</label>
        <button onClick={onsubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input type="text" placeholder='new title...' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
