import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Media from './Admin/Admin Pages/Media/Media';
import Templates from './Admin/Admin Pages/Media/MediaComponents/Templates'
import Multiplexers from './Admin/Admin Pages/Media/MediaComponents/Multiplexers'
import Sources from './Admin/Admin Pages/Media/MediaComponents/Sources'
import VODs from './Admin/Admin Pages/Media/MediaComponents/VODs'
import DVBCards from './Admin/Admin Pages/Media/MediaComponents/DVBCards'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Media/>}></Route>
          <Route path="/media/templates" element={<Templates/>}></Route>
          <Route path="/media/multiplexers" element={<Multiplexers/>}></Route>
          <Route path="/media/sources" element={<Sources/>}></Route>
          <Route path="/media/vods" element={<VODs/>}></Route>
          <Route path="/media/dvbcards" element={<DVBCards/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
