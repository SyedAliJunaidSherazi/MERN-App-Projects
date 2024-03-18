import React from 'react';
import { ingestData } from '../apis/api';
import { useAuth } from '../contexts/AuthContext';

const IngestData = ({token}) => {
  
  const { login: setAuthToken } = useAuth();
  setAuthToken(token)
  const handleIngestData = async () => {
    console.log("Token before sending:", token);

    try {
      const result = await ingestData(token);
      console.log(result);
      alert("Data ingested successfully!");
    } catch (error) {
      console.error(error);
      console.error("Error ingesting data:", error);
    }
   
  };

  return (
    <div>
      <h1>Ingest Data</h1>
      <button onClick={handleIngestData}>Ingest Data</button>
    </div>
  );
};

export default IngestData;
