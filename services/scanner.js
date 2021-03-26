// TODO: Create scanner function that takes in a URL string and passes it to several APIs
// APIs: Google Safe Browsing, VirusTotal, urlscan.io, Google Web Risk, scanii
// Need to respect and handle redirects (301, 308) and too many requests (429)
const axios = require('axios');
const version = require('../package.json').version;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');

const testURL = "testsafebrowsing.appspot.com/s/phishing.html" // Only for testing

// Initialize environment variables
dotenv.config();

async function scan(url) {
  let response = {};

  // Submit URL to be scanned by the submission API
  try {
    let submitResults = await submitAPI(url);

    console.log(`${new Date(Date.now())} - Response received: `);
    console.log(submitResults.data);
  
    // Retrieve the scan results of the URL from results API
    let scanResults = await resultsAPI(submitResults.data.api, 25000);
  
    response = {
      success: true,
      verdict: scanResults.data.verdicts.overall,
      location: scanResults.data.meta.processors.geoip.data
    }
  
  } catch (error) {
    throw "URL could not be resolved."
  }

  return response;

}


/**
 * @description Submits the given URL to be scanned by urlscan.io using the 
 *              submissions API. By default, the visibility is unlisted.
 * 
 * @param       {String} url - The URL received from the user to scan.
 * @returns     {Promise} Promise for response from the urlscan.io API
 */
async function submitAPI(url) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "API-Key": `${process.env.URLSCAN_KEY}`
    }
  };

  let data = {
    "url": url, // Change back to url after testing
    "visibility": "unlisted"
  };

  console.log(`${new Date(Date.now())} - Sending request to urlscan.io submission API`)
  let submission = await axios.post("https://urlscan.io/api/v1/scan/", data, config)

  return submission;
}

/**
 * 
 * @param {String} url - The URL to the results of the scan. 
 */
async function resultsAPI(url, ms) {
  
  // Return a promise that will resolve to the 
  return new Promise(resolve => {

    console.log(`${new Date(Date.now())} - Waiting ${ms/1000}s for urlscan.io to generate results`)

    setTimeout(() => {

        console.log(`${new Date(Date.now())} - Requesting results from: ${url}`)
        resolve(axios.get(url));

    }, ms)

  })

}


module.exports = scan;