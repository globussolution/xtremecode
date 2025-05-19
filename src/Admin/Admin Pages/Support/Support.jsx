import { useState } from 'react';
import AppLayout from "../../Admin Components/AppLayout";
import { Modal } from 'antd';

function Support() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppLayout>
        <div>
          {/* Buttons */}
           <div className='flex lg:flex-row flex-col lg:items-center items-start gap-10 mt-10 lg:px-0 px-4'>
             <button 
              className="px-4 py-2 cursor-pointer font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md" 
              onClick={showModal}
              >
               Enable SSH Access
             </button>
             <p className='font-semibold'>SSH Access Disabled</p>
           </div>

           {/* Content */}
           <div className='lg:px-0 px-4'>
               <h1 className="mt-10 font-semibold text-2xl">Send server status to technical support team</h1>
               <p className="mt-10 text-base text-gray-600 lg:w-[600px] w-[300px]">Please provide a detailed explanation of your issue. If you have already submitted a ticket through our support system, please include the ticket number.</p>
               <p className="mt-5 text-gray-600 lg:w-[600px] w-[300px]">Your config, logs and system stats will be uploaded.</p>
               <p className="mt-5 text-gray-600 lg:w-[600px] w-[300px]">This is not a support request. You will have to open a support request after this upload.</p>
               <div className="mt-5">
                 <textarea className="lg:w-[600px] w-[300px] h-24 border border-gray-300 focus:outline-none focus:border-blue-700 rounded-md"></textarea> 
               </div>
                <button className="transition-all mt-5 shadow-md cursor-pointer font-semibold bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1.5 rounded-md" >Submit</button>
           </div>
        </div>

         {/* Modal */}
          <Modal
            title="Attention!!!"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <p>By enabling SSH access, you are allowing the technical support team members to connect to your Flussonic Media Server over SSH protocol with superuser privileges. Please note that Flussonic Media Server SSH can traverse NAT firewalls and proxies, and you aren’t required to have public IP address or port forwarding enabled to allow the technical support team to connect to your system.</p>
            <p>Consequently, this may entail identifying some of your information stored on your server and on your network resources to the technical support engineers. Therefore the Flussonic Media Server developers require your express consent for your Flussonic Media Server instance to access the technical support servers on the Internet.</p>
            <p>Please acknowledge that you understand all consequences of enabling SSH access by pressing ‘OK’ button below.</p>
            <p>NOTICE that after pressing ‘OK’ button the debug data will be automatically uploaded.</p>
          </Modal>
      </AppLayout>
    </>
  );
}

export default Support;