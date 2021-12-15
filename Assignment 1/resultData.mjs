import { constants } from "buffer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const axios = require('axios');

const resultData = (startDate, endDate, data) => {

  const filteredDate = data.filter(item => {
    let itemDate = item.date.split('.').reverse().join("-")
    let startDateModified = startDate.split('.').reverse().join("-")
    let endDateModified = endDate.split('.').reverse().join("-")
    return (new Date(itemDate).getTime() >= new Date(startDateModified).getTime() && new Date(itemDate).getTime() <= new Date(endDateModified).getTime());
  })
  
  return filteredDate;
}

export default resultData