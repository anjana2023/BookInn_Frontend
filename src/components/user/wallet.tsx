import React, { useEffect } from 'react';
import useSWR from 'swr';
import { USER_API } from '../../constants';
import { fetcher } from '../../utils/fetcher';

const Wallet = () => {
  const { data, error } = useSWR(USER_API + '/walletPayment', fetcher);

  useEffect(() => {
    if (data) {
      console.log(data, 'wallet');
    }
  }, [data]);

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error loading data</div>;

  const transactions = data.transaction || [];
  const balance = data.transaction[0]?.walletId.balance || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Balance Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Balance</h2>
          <div className="text-5xl font-bold text-green-500">${balance}</div>
        </div>

        {/* Transaction History Section */}
        <div className="overflow-x-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Transactions</h3>
          {transactions.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 border-b">Value</th>
                  <th className="py-4 px-6 border-b">Date</th>
                  <th className="py-4 px-6 border-b">Type</th>
                  <th className="py-4 px-6 border-b">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: any, index: any) => (
                  <tr key={index} className="text-center">
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
      </div>
    </div>
  );
};

export default Wallet;
