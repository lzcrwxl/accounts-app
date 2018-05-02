import axios from 'axios'
const api=process.env.REACT_APP_RECORDS_API_URL || "https://5ae5c5ae36a18b00144e3942.mockapi.io"

export const getAll=()=>
  axios.get(`${api}/api/v1/records`)