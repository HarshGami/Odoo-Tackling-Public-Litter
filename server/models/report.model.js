const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    longitude: { type: Number, required: true}, 
    latitude: { type: Number, required: true },  
    status: {
      type: String,
      enum: ['Open', 'Collector assigned', 'Completed'],
      default: 'open'
    },   
    collectorName: { type: String }, 
    collectorEmail: { type: String },
  },
  { collection: "report-data" }
);

const reportmodel = mongoose.model("report-data", ReportSchema);

module.exports = reportmodel;
