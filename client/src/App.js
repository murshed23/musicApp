import './App.css';
import {Header} from "./MyComponents/Header";
import {AddSongs} from "./MyComponents/AddSongs";
import {Songs} from "./MyComponents/Songs";
import {Artists} from "./MyComponents/Artists";
import {AddArtist} from "./MyComponents/addArtist";

function App() {
  return (
    <>
      <Header />
      <Songs/>
      <Artists/>
      <AddSongs />
      <AddArtist />
    </>
  );
}

export default App;
