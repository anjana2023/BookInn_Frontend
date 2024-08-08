import  { useEffect, useState } from 'react';
import useSWR from 'swr';
import { USER_API } from '../../constants';
import { fetcher } from '../../utils/fetcher';

const Wallet = () => {
  const { data, error } = useSWR(USER_API + '/walletPayment', fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Number of transactions to display per page

  useEffect(() => {
    if (data) {
      console.log(data, 'wallet');
    }
  }, [data]);

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error loading data</div>;

  const transactions = data.transaction || [];
  const balance = data.transaction[0]?.walletId.balance || 0;

  // Calculate the current transactions to display
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Change page
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Balance Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Balance: ${balance}</h2>
        </div>

        {/* Transaction History Section */}
        <div className="overflow-x-auto">
          <h3 className="text-xl font-bold mb-6 text-center">Transaction History</h3>
          {transactions.length > 0 ? (
            <table className="min-w-full bg-white border border-orange-200 rounded-lg shadow-sm">
              <thead className="bg-orange-400">
                <tr>
                  <th className="py-4 px-6 border-b text-left">Value</th>
                  <th className="py-4 px-6 border-b text-left">Date</th>
                  <th className="py-4 px-6 border-b text-left">Type</th>
                  <th className="py-4 px-6 border-b text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction:any, index:any) => (
                  <tr key={index} className="text-center hover:bg-gray-100 transition-colors duration-200">
                    <td className="py-4 px-6 border-b">{transaction.amount}</td>
                    <td className="py-4 px-6 border-b">{new Date(transaction.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className={`py-4 px-6 border-b ${transaction.type === 'Credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type}
                    </td>
                    <td className="py-4 px-6 border-b">{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">No transactions available</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              } hover:bg-blue-400`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
