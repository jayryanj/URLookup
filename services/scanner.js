// TODO: Create scanner function that takes in a URL string and passes it to several APIs
// APIs: Google Safe Browsing, VirusTotal, urlscan.io, Google Web Risk, scanii
// Need to respect and handle redirects (301, 308) and too many requests (429)
const axios = require('axios');
const Keys = require('../config/keys');
const version = require('../package.json').version;
const bodyParser = require('body-parser');

const testURL = "testsafebrowsing.appspot.com/s/phishing.html"

function scan(url) {
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
}

function googleSafeBrowsing(url) {
    // Test
}

module.exports = scan;