import React, { useState } from 'react';
import { useQuery, useAction, getTemplatePlaceholders, createDocument } from 'wasp/client/operations';

const DocumentCreationPage = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [clientId, setClientId] = useState('');
  const { data: placeholders, isLoading, error } = useQuery(getTemplatePlaceholders, { templateId: selectedTemplateId }, { enabled: !!selectedTemplateId });
  const createDocumentFn = useAction(createDocument);

  const handleCreateDocument = () => {
    if (selectedTemplateId && clientId) {
      createDocumentFn({ templateId: selectedTemplateId, clientId });
    }
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create a New Document</h1>
      <div className='mb-4'>
        <label className='block mb-2'>Template ID:</label>
        <input
          type='number'
          value={selectedTemplateId || ''}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className='border rounded p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>Client ID:</label>
        <input
          type='number'
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className='border rounded p-2 w-full'
        />
      </div>
      <button
        onClick={handleCreateDocument}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Document
      </button>
      {placeholders && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Placeholders:</h2>
          <ul>
            {placeholders.map((placeholder) => (
              <li key={placeholder.id}>{placeholder.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentCreationPage;
