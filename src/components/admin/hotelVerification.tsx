
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useHistory hook

import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toast';
import { HotelInterface } from '../../types/hotelInterface';
import axiosJWT from "../../utils/axiosService";


const   HotelVerificationPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); 
    const [showModal, setShowModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [hotel, setHotel] = useState<HotelInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchHotelDetails = async () => {
        
        try {
          const { data } = await axiosJWT.get(`${ADMIN_API}/hotelDetails/${id}`);        
          setHotel(data.Hotel);
        } catch (error) {
          setError("Failed to fetch hotel details");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHotelDetails();
    }, [id]);


    const handleVerification = async (status: string) => {
        if (status === 'rejected') {
          setShowModal(true);
        } else {
          try {
            const response = await axiosJWT.patch(`${ADMIN_API}/verify_hotel/${id}`, { status });
            showToast(response.data.message,"success")
            navigate('/admin/hotels');
          } catch (error) {
            console.error('Error verifying doctor:', error);
          }
        }
      };
    
      const handleRejectConfirm = async () => {
        try {
          await axiosJWT.patch(`${ADMIN_API}/verify_hotel_rejection/${id}`, { status: 'rejected', reason: rejectionReason });
          setShowModal(false);
          navigate('/admin/hotels');
        } catch (error) {
          console.error('Error rejecting doctor:', error);
        }
      };
    
      if (loading) {
        return <div>Loading...</div>; 
      }
  
      if (error) {
        return <div>{error}</div>; 
      }

  return(
    <div className="flex justify-center items-center mt-10">
    <div className="max-w-lg w-full bg-gray-100 p-8 rounded-lg shadow-lg">
      <img src={hotel?.imageUrls[2]} alt="Profile" className="w-44 h-44 mx-auto rounded mb-4" />
      <h2 className="text-2xl font-bold text-center mb-4">{hotel?.name}</h2>
      <p className="text-gray-700 text-lg text-center mb-4">{hotel?.place}</p>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleVerification('approved')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleVerification('rejected')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Reject
        </button>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">Reason for Rejection</h3>
                    <div className="mt-2">
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Enter reason for rejection"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleRejectConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}


export default HotelVerificationPage;