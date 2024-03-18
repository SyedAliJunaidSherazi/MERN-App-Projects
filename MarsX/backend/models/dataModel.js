const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    national: {
        type: String,
        required: true,
      },
      vaccinationStatus: {
        type: String,
      },
      jurisdictional: {
        type: String,
      },
      intent: {
        type: String,
      },
      demographics: {
        type: String,
      },
 
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
