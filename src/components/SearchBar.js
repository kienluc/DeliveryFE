import React from 'react'
import {  BiSearch } from "react-icons/bi";
const SearchBar = ({onInputChange, onGetOrder}) => {
    return (
        <div className="search-bar flex-1">
            <input className="search-input" placeholder="Nhập mã đơn hàng cần tra cứu..." onChange={onInputChange} />
            <button className="search-button" onClick={onGetOrder}><BiSearch className="search-icon" /></button>
        </div>
    )
}

export default SearchBar
