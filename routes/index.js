// routes/index.js
// Contains all of the routing rules for the express server

// Imports any required modules
const config = require("../config");
const request = require("request");

module.exports = (app) => {

  // Sets routing rules for requests to '/'
  app.get('/', (req, res) => {

    // Retrieve API data
    request(config.api, (error, response, body) => {

      // Check for errors and report to the user if found
      if (error)
        res.render("api_error");

      let body_json;
      if (!(body_json = JSON.parse(body)))
        res.render("parsing_error");

      // Parse the SES API data and serve it to the user
      let ses_stats = {
        enabled: body_json.body.ses_sending_enabled,
        bounce_rate: body_json.body.stats.bounce_rate,
        complaint_rate: body_json.body.stats.complaint_rate,
        total_send_attempts: body_json.body.stats.total_send_attempts,
        total_send_quota: body_json.body.stats.total_send_quota
      };

      res.render("index", ses_stats);
    });

  });

};
