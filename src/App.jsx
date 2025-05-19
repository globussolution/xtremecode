import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Media from './Admin/Admin Pages/Media/Media';
import Templates from './Admin/Admin Pages/Media/MediaComponents/Templates'
import Multiplexers from './Admin/Admin Pages/Media/MediaComponents/Multiplexers'
import Sources from './Admin/Admin Pages/Media/MediaComponents/Sources'
import VODs from './Admin/Admin Pages/Media/MediaComponents/VODs'
import DVBCards from './Admin/Admin Pages/Media/MediaComponents/DVBCards'
import Create from './Admin/Admin Pages/Media/MediaComponents/Create'
import EditStream from './Admin/Admin Pages/Media/MediaComponents/EditStream';
import MediaInput from './Admin/Admin Pages/Media/MediaComponents/MediaInput';
import Transcoder from './Admin/Admin Pages/Media/MediaComponents/Transcoder';
import DVR from './Admin/Admin Pages/Media/MediaComponents/DVR';
import Output from './Admin/Admin Pages/Media/MediaComponents/Output';
import EPG from './Admin/Admin Pages/Media/MediaComponents/EPG';
import Auth from './Admin/Admin Pages/Media/MediaComponents/Auth';
import PlaySessions from './Admin/Admin Pages/Media/MediaComponents/PlaySessions';
import Cluster from './Admin/Admin Pages/Cluster/Cluster';
import IPTV from './Admin/Admin Pages/IPTV/IPTV';
import IPCameras from './Admin/Admin Pages/IP Cameras/IPCameras';
import Support from './Admin/Admin Pages/Support/Support';
import Pulse from './Admin/Admin Pages/Pulse/Pulse';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Media Routes */}
          <Route path="/" element={<Media/>}></Route>
          <Route path="/media/create" element={<Create/>}></Route>
          <Route path="/media/templates" element={<Templates/>}></Route>
          <Route path="/media/multiplexers" element={<Multiplexers/>}></Route>
          <Route path="/media/sources" element={<Sources/>}></Route>
          <Route path="/media/vods" element={<VODs/>}></Route>
          <Route path="/media/dvbcards" element={<DVBCards/>}></Route>
          <Route path="/media/:id" element={<EditStream/>}></Route>
          <Route path="/media/overview" element={<EditStream/>}></Route>
          <Route path="/media/input" element={<MediaInput/>}></Route>
          <Route path="/media/transcoder" element={<Transcoder/>}></Route>
          <Route path="/media/dvr" element={<DVR/>}></Route>
          <Route path="/media/output" element={<Output/>}></Route>
          <Route path="/media/epg" element={<EPG/>}></Route>
          <Route path="/media/auth" element={<Auth/>}></Route>
          <Route path="/media/playsessions" element={<PlaySessions/>}></Route>

          {/* Pulse Routes */}
          <Route path="/pulse" element={<Pulse/>}></Route>

          {/* Cluster Routes */}
          <Route path="/cluster" element={<Cluster/>}></Route>

          {/* IPTV Routes */}
          <Route path="/iptv" element={<IPTV/>}></Route>

          {/* IP Cameras Routes */}
          <Route path="/ipcameras" element={<IPCameras/>}></Route>

          {/* Support Routes */}
          <Route path="/support" element={<Support/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
