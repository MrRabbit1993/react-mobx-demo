import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { observable, action } from "mobx"
import { observer } from "mobx-react"

class Store {
  @observable cache = { queue: [] }
  @action.bound refresh() {
    this.cache.queue.push(1)
  }
}

const store = new Store()

@observer
class Bar extends Component {
  static propTypes = {
    queue: PropTypes.array
  }
  render() {
    const { queue } = this.props
    return <span>{queue.length}</span>
  }
}


class Foo extends Component {
  static propTypes = {
    cache: PropTypes.object
  }
  render() {
    const { cache, refresh } = this.props
    return (<div>
      <button onClick={refresh}>refresh</button>
      <Bar queue={cache.queue} />
    </div>)
  } 
}
console.log(store)
ReactDOM.render(
  <Foo cache={store.cache} refresh={store.refresh} />,
  document.getElementById('root')
);
