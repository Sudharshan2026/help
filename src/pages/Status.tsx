import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRequests } from '../utils/storage';
import type { Request } from '../types';

export const Status = () => {
  const location = useLocation();
  const [secRollNumber, setsecRollNumber] = useState(location.state?.secRollNumber || '');
  const [requests, setRequests] = useState<Request[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const allRequests = getRequests();
    setRequests(allRequests.filter((r) => r.secRollNumber === secRollNumber));
    setSearched(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#bd9607]">Check Request Status</h2>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter your Student ID"
              value={secRollNumber}
              onChange={(e) => setsecRollNumber(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              required
            />
            <button
              type="submit"
              className="bg-[#bd9607] text-white px-6 py-2 rounded-md hover:bg-[#a68206] focus:outline-none focus:ring-2 focus:ring-[#bd9607] focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
        </form>

        {searched && requests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No requests found for this Student ID.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{request.type} Request</h3>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : ''}
                      ${request.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
                    `}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Duration:</span>{' '}
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Reason:</span>{' '}
                    {request.reason}
                  </p>
                  {request.documentUrl && (
                    <p>
                      <span className="font-medium">Document:</span>{' '}
                      <a
                        href={request.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#bd9607] hover:underline"
                      >
                        View Document
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};