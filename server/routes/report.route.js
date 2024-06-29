const express = require("express");
const {
  create_report,
  change_report_status,
  assign_collector_to_report,
  reports_of_user,
  get_all_reports,
  reports_of_collector
} = require("../controllers/report.controller");
const reportRouter = express.Router();

reportRouter.route("/create_report").post(create_report);
reportRouter.route("/change_report_status").patch(change_report_status);
reportRouter.route("/assign_collector_to_report").patch(assign_collector_to_report);
reportRouter.route("/reports_of_user" ).get(reports_of_user)
reportRouter.route("/get_all_reports").get(get_all_reports)
reportRouter.route("/reports_of_collector").get(reports_of_collector)

module.exports = reportRouter;
