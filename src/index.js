import React, { useState} from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { observer } from "mobx-react"
import store from "./mobx"
import styles from "./index.module.css"
import ListItem from "./list"

const TodoList = observer((props) => {
  const { store: { lists, createList, unFinish,removeList } } = props;
  console.log("渲染", props)
  const [inputVal, setInputVal] = useState('');//输入框的值
  // const _del = useMemo(()=>removeList,[])
  // const _lists = useMemo(()=>lists,[lists])
  // const _del = useCallback(removeList,[removeList])
  const handleSubmit = (event) => {
    event.preventDefault();
    createList(inputVal);//创建一条代办
    setInputVal("");//清空输入框
  }
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputVal(inputValue)
  }
  return (
    <div className="todo-list">
      <header>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={inputVal} className={styles.input} placeholder="请输入待办项" />
        </form>
      </header>
      <ul>
        {
          lists.map(list => {
            return <ListItem key={list.id} list={list} delList={removeList}/>
          })
        }
      </ul>
      <footer>{unFinish} item(s) unfinished</footer>
    </div>
  )
})
TodoList.propTypes = {
  store: PropTypes.shape({
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    createList: PropTypes.func
  }).isRequired
}

ReactDOM.render(
  <TodoList store={store} />,
  document.getElementById('root')
);
