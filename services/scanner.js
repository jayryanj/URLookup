// TODO: Create scanner function that takes in a URL string and passes it to several APIs
// APIs: Google Safe Browsing, VirusTotal, urlscan.io, Google Web Risk, scanii
// Need to respect and handle redirects (301, 308) and too many requests (429)
const axios = require('axios');
const Keys = require('../config/keys');
const version = require('../package.json').version;
const bodyParser = require('body-parser');

const testURL = "testsafebrowsing.appspot.com/s/phishing.html" // Only for testing

function scan(url) {
  
  return submitAPI(url)
    .then((url) => {
      return resultsAPI(url)
    })
    .catch(error => console.log(error))
}

/*
function googleSafeBrowsing(url) {
  const data = {
    "client": {
        "clientId":      "URLooker",
        "clientVersion": `${version}`
      },
      "threatInfo": {
        "threatTypes": [
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "POTENTIALLY_HARMFUL_APPLICATION",
            "UNWANTED_SOFTWARE"
        ],
        "platformTypes": ["ANY_PLATFORM"],
        "threatEntryTypes": ["URL"],
        "threatEntries": [
          {"url": `${url}`}
        ]
      }
}
  return axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${Keys.gsbKey}`, data)
    .then((results) => { return results.data });
}*/

function submitAPI(url) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "API-Key": `${Keys.urlscanKey}`
    }
  };

  const data = {
    "url": url,
    "visibility": "unlisted"
  };

  return axios.post("https://urlscan.io/api/v1/scan/", data, config)
    .then((response) => {
      return response.data.api;
     })
    .catch(error => {
      console.log("Oh no!");
      console.log(error);
    })
}

function resultsAPI(url) {
  return axios.get(url)
    .then(response => { 
      return response.data 
    })
    .catch( error => {
      console.log(error);
    });
}

module.exports = scan;