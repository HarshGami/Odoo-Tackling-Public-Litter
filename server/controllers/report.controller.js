const usermodel = require("../models/user.model");
const reportmodel  = require("../models/report.model")
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.create_report = async (req, res) => {
  try {
    const { userEmail, imageURL, description, longitude, latitude } = req.body;

    if (!userEmail) {
      return res.status(400).json({ status: "error", message: "User email is required." });
    }

    if (!imageURL) {
      return res.status(400).json({ status: "error", message: "Image URL is required." });
    }

    if (!description) {
      return res.status(400).json({ status: "error", message: "Description is required." });
    }

    if (!longitude) {
      return res.status(400).json({ status: "error", message: "Longitude is required." });
    }

    if (!latitude) {
      return res.status(400).json({ status: "error", message: "Latitude is required." });
    }

    const userDetails = await usermodel.findOne({email: userEmail });
    if (!userDetails) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    const newUserReport = await reportmodel.create({
      userName: userDetails.name,
      userEmail: userEmail,
      imageURL: imageURL,
      description: description,
      longitude: longitude,
      latitude: latitude,
      status: "Open",
    });

    res.status(201).json({
      status: "ok",
      message: "Report created successfully.",
      report: newUserReport,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.change_report_status = async (req, res) => {
  try {
    const { reportId, status } = req.body;

    if (!status) {
      return res.status(400).json({ status: "error", message: "status is required." });
    }

    const objectId = new ObjectId(reportId);

    const existingReport = await reportmodel.findById({ _id: objectId });
    if (!existingReport) {
      return res.status(404).json({ status: "error", message: "Report not found." });
    }

    existingReport.status = status;
    await existingReport.save();

    res.status(200).json({
      status: "ok",
      message: "Report status updated successfully.",
      updatedReport: existingReport,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


exports.assign_collector_to_report = async (req, res) => {
  try {
    const { reportId, collectorEmail } = req.body;

    if (!collectorEmail) {
      return res.status(400).json({ status: "error", message: "Collector email is required." });
    }

    const collectorDetails = await usermodel.findOne({email: collectorEmail });
    if (!collectorDetails) {
      return res.status(404).json({ status: "error", message: "Collector not found." });
    }

    const objectId = new ObjectId(reportId);

    const existingReport = await reportmodel.findById({_id: objectId});
    if (!existingReport) {
      return res.status(404).json({ status: "error", message: "Report not found." });
    }

    existingReport.collectorName = collectorDetails.name;
    existingReport.collectorEmail = collectorEmail;
    existingReport.status = 'Collector assigned';
    await existingReport.save();

    res.status(200).json({
      status: "ok",
      message: "Collector assigned to report successfully.",
      updatedReport: existingReport,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


exports.reports_of_user = async (req, res) => {
  try {
    const { email, status } = req.query;

    const user = await usermodel.findOne({email: email });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    let query = {userEmail: email };
    if (status) {
      query.status = status; 
    }

    const reports = await reportmodel.find(query);

    res.status(200).json({
      status: 'ok',
      message: 'Reports retrieved successfully.',
      reports,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


exports.get_all_reports = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status) {
      query.status = status; 
    }

    const reports = await reportmodel.find(query);

    res.status(200).json({
      status: 'ok',
      message: 'Reports retrieved successfully.',
      reports,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


exports.reports_of_collector = async (req, res) => {
  try {
    const { email, status } = req.query;

    const user = await usermodel.findOne({email: email });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Collector not found.' });
    }

    let query = {collectorEmail: email };
    if (status) {
      query.status = status; 
    }

    const reports = await reportmodel.find(query);

    res.status(200).json({
      status: 'ok',
      message: 'Reports retrieved successfully.',
      reports,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};