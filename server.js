const express = require('express')
const NLPCloudClient = require("nlpcloud");


const app = express()

const PORT = 8080


app.get('/',async(req,res)=>{
   console.log('hi')
   const results = [];
   const client = new NLPCloudClient(
    "bart-large-mnli-yahoo-answers",
    proccess.env.nlpCloudKey,
    true,  
    "en"
  )
  const fechData = async () => {
  let data = ['i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i love this shirt','i do not like this phone','i do not like this phone','i do not like this phone','i do not like this phone','i do not like this phone','i do not like this phone']
    const results = [];
    for (let i = 0; i < data.length; i += 3) {
      const Responses = await Promise.all([
        client.classification(data[i], ["positive ", "negatice"], true),
        client.classification(data[i + 1] , ["positive ", "negatice"], true),
        client.classification(data[i + 2] , ["positive ", "negatice"], true)
      ]);
      results.push(...Responses);
      console.log(Responses.length, ' succeeded requests')
    }
    return results;
  }
  
  try{
    const finalResults = await fechData()
    console.log( finalResults)
    
  }
  catch(err){
  console.log('error')
  console.error(err.response.status);
    console.error(err.response.data);
    res.send(err)
  }
  // const formated= await finalResults[0].json()
 

})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

