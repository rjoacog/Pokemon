import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, removerDetailPokemons } from "../actions";
import { useState } from "react";
import { useEffect } from "react";
import s from "./Details.module.css";

export default function Details(props) {
    console.log(props)
    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(removerDetailPokemons())
        }
    }, []);

    const myPokemon = useSelector((state) => state.details);
    // console.log(myPokemon)
    // const tipos = myPokemon.types?.type || myPokemon[0]?.tipo
    console.log(myPokemon)
    return (
        <div className={s.container}>
            <Link to="/home" >
                <button className={s.button}>HOME</button>
            </Link>
            {
                Object.keys(myPokemon).length ?
                    <div className={s.card}>
                        <h1>NOMBRE: {myPokemon.name}</h1>
                        <img src={myPokemon.img? myPokemon.img : "https://4.bp.blogspot.com/-tuWmp9S6hy8/V6Z8-2N2XfI/AAAAAAAA_84/cxrZxgtZV44LD0zF69Xw_uuY7fLPb-URQCLcB/s1600/pikachu-wallpaper.png"} width="80" />
                        <h3>TIPO: {myPokemon.types? myPokemon.types.map(el => el.type.name + (",")) : myPokemon.tipo.map(el=> el.name + (","))} </h3>
                        <h3>Id: {myPokemon.id} </h3>
                        <h4>VIDA: {myPokemon.vida}</h4>
                        <h4>ATAQUE: {myPokemon.ataque}</h4>
                        <h4>DEFENSA: {myPokemon.defensa}</h4>
                        <h4>VELOCIDAD: {myPokemon.velocidad}</h4>
                        <h4>ALTURA: {myPokemon.altura}</h4>
                        <h4>PESO: {myPokemon.peso}</h4>
                    </div> : <p>Loading..</p>
            }
        </div>
    )
}