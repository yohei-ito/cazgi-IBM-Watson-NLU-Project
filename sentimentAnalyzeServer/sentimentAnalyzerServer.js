const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.API_KEY);

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    console.log("naturalLanguageUnderstanding returned");
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
  console.log('route : url/emotion');
  let nlu = getNLUInstance();
  const analyzeParams = {
    'url': req.query.url,
    'features': {
      'emotion': {
      }
    }
  };
  nlu.analyze(analyzeParams)
    .then(analysisResults => {
      //console.log(JSON.stringify(analysisResults, null, 2));
      console.log('emotion = '+JSON.stringify(analysisResults.result.emotion.document.emotion));
      return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
      console.log('error:', err);
      return res.send("url emotion for "+req.query.url+" is error");
    });

});

app.get("/url/sentiment", (req,res) => {
    console.log('route: url/sentiment');
    let nlu = getNLUInstance();
    const analyzeParams = {
      'url': req.query.url,
      'features': {
        'sentiment': {
        }
      }
    };
    nlu.analyze(analyzeParams)
      .then(analysisResults => {
        //console.log(JSON.stringify(analysisResults, null, 2));
        console.log('label = '+analysisResults.result.sentiment.document.label);
        return res.send(analysisResults.result.sentiment.document.label);
      })
      .catch(err => {
        console.log('error:', err);
        return res.send("url sentiment for "+req.query.url+" is error");
      });
});

app.get("/text/emotion", (req,res) => {
  console.log('route : text/emotion');
  let nlu = getNLUInstance();
  const analyzeParams = {
    'text': req.query.text,
    'features': {
      'emotion': {
      }
    }
  };
  nlu.analyze(analyzeParams)
    .then(analysisResults => {
      //console.log(JSON.stringify(analysisResults, null, 2));
      console.log('emotion = '+JSON.stringify(analysisResults.result.emotion.document.emotion));
      return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
      console.log('error:', err);
      return res.send("text emotion for "+req.query.text+" is error");
    });

});

app.get("/text/sentiment", (req,res) => {
  console.log('route: text/sentiment');
  let nlu = getNLUInstance();
  const analyzeParams = {
    'text': req.query.text,
    'features': {
      'sentiment': {
      }
    }
  };
  nlu.analyze(analyzeParams)
    .then(analysisResults => {
      //console.log(JSON.stringify(analysisResults, null, 2));
      console.log('label = '+analysisResults.result.sentiment.document.label);
      return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
      console.log('error:', err);
      return res.send("text sentiment for "+req.query.text+" is error");
    });

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
