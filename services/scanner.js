// TODO: Create scanner function that takes in a URL string and passes it to several APIs
// APIs: Google Safe Browsing, VirusTotal, urlscan.io, Google Web Risk, scanii
// Need to respect and handle redirects (301, 308) and too many requests (429)
const axios = require('axios');
const Keys = require('../config/keys');
const version = require('../package.json').version;
const bodyParser = require('body-parser');

const testURL = "testsafebrowsing.appspot.com/s/phishing.html" // Only for testing

async function scan(url) {
  let submitResults = await submitAPI(url);
  console.log(`${new Date(Date.now())} - Response received: `);
  console.log(submitResults.data);

  let results = await resultsAPI(submitResults.data.api);
  console.log(results.data.verdicts.overall);
  return results.data;
}

function submitAPI(url) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "API-Key": `${Keys.urlscanKey}`
    }
  };

  let data = {
    "url": url,
    "visibility": "unlisted"
  };

  console.log(`${new Date(Date.now())} - Sending request to urlscan.io submission API`)

  return axios.post("https://urlscan.io/api/v1/scan/", data, config);;
}

async function resultsAPI(url) {
  return new Promise(res => {
    console.log(`${new Date(Date.now())} - Waiting 25s for urlscan.io to generate results`)
    setTimeout(() => {
        console.log(`${new Date(Date.now())} - Requesting results from: ${url}`)
        res(axios.get(url));
    }, 25000)
  })
}


module.exports = scan;