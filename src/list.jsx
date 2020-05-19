import { observer } from "mobx-react";
import PropTypes from "prop-types";
import React from "react";
import styles from "./index.module.css"
import {trace,toJS} from "mobx"
const  List = observer((props)=>{
    const {list,delList} = props;
    const {finished,title,toggle} = list;
    trace()
    return (
        <li className={styles.list}>
            <input type="checkbox" className={styles.toggle} checked={finished} onChange={toggle}/>
            <span className={[styles.title,finished&&styles.finished].join(' ')}>{title}</span>
            <span className={styles.del} onClick={()=>delList(list)}>X</span>
        </li>
    )
})
List.propTypes={
    list:PropTypes.shape({
        id:PropTypes.number.isRequired,
        title:PropTypes.string.isRequired,
        finished:PropTypes.bool.isRequired
    }).isRequired
}
export default List;