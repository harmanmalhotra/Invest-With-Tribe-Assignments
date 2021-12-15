import { constants } from "buffer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const axios = require('axios');

const getData = (url, callback) => 
{
    axios.get(url)
    .then(function (response) {
    
    let data=response.data
    //console.log(data[Object.keys(data)[0]])
    callback(data[Object.keys(data)[0]].events, data[Object.keys(data)[1]].events, data[Object.keys(data)[2]].events)
  })
  .catch(function (error) {
    console.log(error);
  })
}

export default getData