
import React, { useState } from "react";
import { getData } from "../apis/api";


const GetData = () => {
  const [filters, setFilters] = useState({});
  const [result, setResult] = useState(null);
  let dataArray = "";

  const handleGetData = async () => {
    try {
      const data = await getData(filters);
    
      setResult(data);
      dataArray = JSON.stringify(result?.data || []);
      console.log("Final One" + dataArray);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Get Data</h1>
      <div >
        <label>National:</label>
        <input
          type="text"
          value={filters.national}
          onChange={(e) => setFilters({ ...filters, national: e.target.value })}
        />
        <label>Jurisdictional:</label>
        <input
          type="text"
          value={filters.jurisdictional}
          onChange={(e) =>
            setFilters({ ...filters, jurisdictional: e.target.value })
          }
        />
        <label>VaccinationStatus:</label>
        <input
          type="text"
          value={filters.vaccinationStatus}
          onChange={(e) =>
            setFilters({ ...filters, vaccinationStatus: e.target.value })
          }
        />
        <label>Intent:</label>
        <input
          type="text"
          value={filters.intent}
          onChange={(e) => setFilters({ ...filters, intent: e.target.value })}
        />
        <label>Demographics:</label>
        <input
          type="text"
          value={filters.demographics}
          onChange={(e) =>
            setFilters({ ...filters, demographics: e.target.value })
          }
        />
      </div>

     
      <button  onClick={handleGetData}>Get Data</button>
      {result && (
       
       <div>
  <h2>Result:</h2>

  <div style={{ border: '1px solid #000000', padding: '10px' }}>
    <pre>{JSON.stringify(result, null, 2)}</pre>
  </div>
</div>
      )}
      
    </div>
  );
};

export default GetData;
