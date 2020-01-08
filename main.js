import axios from 'axios'

const CSV_FILES_PATH = '/data'

async function parseData (url) {
  const request = await axios.get(`${CSV_FILES_PATH}/${url}`)
  console.log(request)
}

parseData('Tandem Data 20191113-20200106.csv')
