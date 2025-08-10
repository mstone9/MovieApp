import './css/App.css'
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Favorites from "./pages/Favorites.tsx";
import {MovieProvider} from "./contexts/MovieContext.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {

    return (
        <MovieProvider>
            <NavBar/>
            <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favorites" element={<Favorites/>} />
                </Routes>
            </main>
        </MovieProvider>
  );
}

export default App
