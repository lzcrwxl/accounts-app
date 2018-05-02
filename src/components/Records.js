import React, { Component } from 'react';
import Record from './Record'
import axios from  'axios'

class Records extends Component {
  constructor(){
    super();
    this.state={
      error:null,
      isLoaded:false,
      records:[]
    }
  }
  componentDidMount(){
     axios.get("https://5ae5c5ae36a18b00144e3942.mockapi.io/api/v1/records").then(
      resp=>this.setState({
        records:resp.data,
        isLoaded:true
      }),
   ).catch(
      error=>this.setState({
        isLoaded:true,
        error
      })
    )
  }
  render() {
    const {error,isLoaded,records}=this.state;
    if(error){
      return <div>Error:{error.message}</div>
    }else if(!isLoaded){
      return <div>Loading...</div>
    }else{
      return (
        <div>
          <h2>Records</h2> 
          <table className="table table-bordered">
            <thead>
              <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record)=><Record key={record.id} {...record}/>)}
            </tbody>
          </table> 
        </div>
      );
    }
  }
}

export default Records;
