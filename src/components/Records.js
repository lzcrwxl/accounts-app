import React, { Component } from 'react';
import Record from './Record'
import axios from  'axios'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

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
    RecordsAPI.getAll().then(
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
  addRecord(record){
    console.log(record)
    this.setState({
      error:null,
      isLoaded:true,
      records:[
        ...this.state.records,
        record
      ]
    })
  }
  deleteRecord(record){
    console.log(record)
    const recordIndex=this.state.records.indexOf(record);
    const newRecords=this.state.records.filter((item,index)=>index!==recordIndex)
    this.setState({
      records:newRecords
    })
  }
  updateRecord(record,data){
    console.log(record,data)

    const recordIndex=this.state.records.indexOf(record);
    const newRecords= this.state.records.map((item,index)=>{
      if(index!==recordIndex){
        return item;
      }
      return{
        ...item,
        ...data
      }
    })
    this.setState({
      records:newRecords
    })

  }
  render() {
    const {error,isLoaded,records}=this.state;
    let recordsComponent;
    if(error){
      return <div>Error:{error.message}</div>
    }else if(!isLoaded){
      recordsComponent= <div>Loading...</div>;
    }else{
      recordsComponent= (   
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record)=>
                (<Record 
                  key={record.id} 
                  record={record} 
                  handleEditRecord={this.updateRecord.bind(this)}
                  handleDeleteRecord={this.deleteRecord.bind(this)}
                />)
              )}
          </tbody>
        </table> 
      );
    }
    return(
      <div>
        <h2>Records</h2> 
          <RecordForm handleNewRecord={this.addRecord.bind(this)}></RecordForm>
          {recordsComponent}
      </div>
    )
  }
}

export default Records;


