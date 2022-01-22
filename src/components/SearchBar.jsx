import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getPokemonName } from "../actions";
import s from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    // const error = useSelector((state) => state.error)

    function handleInputChange(e) {
        e.preventDefault(e);
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(getPokemonName(name));
        setName("")
    }

    return (
        <div className={s.container}>
            <input
                type="text"
                placeholder="Buscar pokemon..."
                onChange={e => handleInputChange(e)}
            />
            <button className={s.button} onClick={e => handleSubmit(e)}>BUSCAR</button>    
        </div>        
    )
    
}