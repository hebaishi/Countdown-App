import { Component } from 'react';
import global_store from './GlobalStore'

class DataFetcher extends Component {
  
  constructor() {
    super();
    this.init();
    setInterval(() => this.reloadData(), 2000)
    this.reloadData();
  }
  
  init() {
    global_store.days_elapsed = global_store.days;
    global_store.seconds_elapsed = 0;
    global_store.label = '';
    global_store.showDialog = false;
    global_store.color = 'success';
  }

  reloadData() {
    fetch('/api/elapsed_time')
    .then((results) => {
      return results.json();
    }).then((dat) => {
      var days = dat.days;
      global_store.days = days;
      global_store.days_elapsed = days;
      global_store.seconds_elapsed = dat.seconds;
      global_store.label = dat.label;
      global_store.color = this.getColor(days);
    })
  }

  render() {
    return (null)
  }

}

export default DataFetcher;