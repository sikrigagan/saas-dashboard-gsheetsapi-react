import React, { Component } from 'react';
import config from './config';
import './App.css';

const url = `https://sheets.googleapis.com/v4/spreadsheets/${ config.spreadsheetId }/values:batchGet?ranges=Sheet1&majorDimension=${ config.dimension }&key=${ config.apiKey }`;

class App extends Component {
  constructor() {
    super();
    this.state = {
     items:[]
    };
  }
  
  componentDidMount() {
    fetch(url).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;
 
      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
 
      this.setState({ items: rows });
    });
  }
  
  render() {
    const listItems = this.state.items.map((item) =>
      <li>Net revenue for {item.month} was {item.net_revenue} with gross revenue and coupon spends of {item.gross_revenue} and {item.coupon_spend}({item.coupon_share}) respectively. <br/>Churn rate was {item.churn}; with {item.renewed_users} renewals and {item.new_users} new users. While, ARPU was {item.arpu}; CAC was {item.cac} and LTV was {item.ltv}</li>
    ); 

    return (
      <div>
         <ul>{listItems}</ul>
      </div>
    );
  }
}

export default App;
