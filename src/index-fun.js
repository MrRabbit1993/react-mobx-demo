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

const Bar = observer((props) => {
  const { queue } = props
  return <span>{queue.length}</span>
})
Bar.propTypes = {
  queue: PropTypes.array
}
const Foo = (props) => {
  const { cache, refresh } = props
  return (<div>
    <button onClick={refresh}>refresh</button>
    <Bar queue={cache.queue} />
  </div>)
}
Foo.propTypes = {
  cache: PropTypes.object
}
ReactDOM.render(
  <Foo cache={store.cache} refresh={store.refresh} />,
  document.getElementById('root')
);
