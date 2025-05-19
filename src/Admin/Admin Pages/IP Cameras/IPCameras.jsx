import { Link } from "react-router-dom";
import AppLayout from "../../Admin Components/AppLayout";


function IPCameras(){
    return(
        <>
          <AppLayout>
                 <div className="lg:px-0 px-4">
                    <h1 className="text-2xl font-bold mt-12 mb-5">Watcher</h1>
                    <p className="lg:w-[500px] w-[300] text-base">Flussonic Watcher is a complete video surveillance software system based on Flussonic Media Server and Flussonic Central. You can use it for managing a distributed IP camera network. <Link to="/ipcameras">Learn more</Link></p>
                    <p className="lg:w-[500px] w-[300] text-base mt-5">Please note that you cannot change the streams configuration in Flussonic Media Server when it operates as part of Flussonic Watcher.</p>
                 </div>
          </AppLayout>
        </>
    )
}

export default IPCameras;