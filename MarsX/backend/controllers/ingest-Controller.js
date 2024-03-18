const axios = require('axios');
const jwt = require('jsonwebtoken');
const Data = require('../models/dataModel');
const HttpError = require('../models/http-error'); 
const cdc = require('../config/url')
const key  = require('../config/keys')

// Dummy JSON for testing purpose
const dummyData = [
  {
    national: 'USA',
    vaccinationStatus: 'Fully Vaccinated',
    jurisdictional: 'New York',
    intent: 'Willing',
    demographics: 'Adult',
  },
  {
    national: 'Canada',
    vaccinationStatus: 'Partially Vaccinated',
    jurisdictional: 'Ontario',
    intent: 'Undecided',
    demographics: 'Young Adult',
  },
  {
    national: 'Germany',
    vaccinationStatus: 'Not Vaccinated',
    jurisdictional: 'Bavaria',
    intent: 'Not Willing',
    demographics: 'Senior',
  },
  {
    national: 'Australia',
    vaccinationStatus: 'Unknown',
    jurisdictional: 'Victoria',
    intent: 'Willing',
    demographics: 'Teenager',
  },
 
];

const generateToken = (userId) => {
  
  const expiresInOneMonth = 30 * 24 * 60 * 60;
  return jwt.sign({ userId }, key.secretKey, { expiresIn: expiresInOneMonth });
};

const ingestData = async (req, res) => {
  try {
    // Checking if the request contains a valid token
    const token = req.headers.authorization.split(' ')[1]; 

    if (!token) {
      throw new HttpError('Authentication failed',401);
    }

    // Verifying the token
    const decodedToken = jwt.verify(token, key.secretKey);
    
    console.log("got the token Token" + token)
    
    

    // the dataset provided link hosting server is down at my side. i tried to access the complete json but couldn't do so. 
    //anyways i have provided complete code how to access the json from CDC. the code is commented below
    // for testing the code, am using a dummy json to test the project.
    

    // Fetch data from CDC (commented out for testing with dummy data)
    // const cdcData = await axios.get(cdc.CDCUri);
    // const transformedData = cdcData.data.map((item) => {
    //   const cleanedData = {
    //     name: item.name || 'Unknown',
    //     vaccinationStatus: item.vaccinationstatus || 'Unknown',
    //     intent: item.intent || 'Unknown',
    //     demographics: item.demographics || 'Unknown',
    //   };
    //   return cleanedData;
    // });

    // Using dummy data for testing instead of fetching from CDC due to reasons mentioned above in comments
    const transformedData = dummyData.map((item) => {
      const cleanedData = {
        national: item.national || 'Unknown',
        vaccinationStatus: item.vaccinationStatus || 'Unknown',
        jurisdictional: item.jurisdictional || 'Unknown',
        intent: item.intent || 'Unknown',
        demographics: item.demographics || 'Unknown',
      };
      return cleanedData;
    });

    // Storing dummy data in MongoDB
    await Data.insertMany(transformedData);

    res.status(200).json({
      success: true,
      message: 'Data ingested successfully',
      token: generateToken(decodedToken.userId),
    });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.status).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};

const getData = async (req, res) => {
  try {
    // Fetching filtering parameters from the request query
    const { national, jurisdictional, vaccinationStatus, intent, demographics } = req.query;

    // Defining the filter object based on the provided parameters
    const filter = {};
    if (national) filter.national = national;
    if (jurisdictional) filter.jurisdictional = jurisdictional;
    if (vaccinationStatus) filter.vaccinationStatus = vaccinationStatus; 
    if (intent) filter.intent = intent;
    if (demographics) filter.demographics = demographics;

   

    // Using the filter object in the MongoDB query
    const data = await Data.find(filter);
   

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  ingestData,
  getData,
};
