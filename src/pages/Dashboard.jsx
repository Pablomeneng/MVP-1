import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getUserDocuments } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: documents, isLoading, error } = useQuery(getUserDocuments);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-1 gap-4'>
        {documents.map((document) => (
          <div
            key={document.id}
            className='bg-white shadow-md p-4 rounded-lg flex justify-between items-center'
          >
            <div>
              <h2 className='text-xl font-semibold'>Document ID: {document.id}</h2>
              <p>Status: {document.status}</p>
            </div>
            <Link
              to={`/document/${document.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
