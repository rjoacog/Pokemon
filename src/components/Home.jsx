import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterPokemonsByTypes, getPokemons, getTypes, filterCreated, orderByName, orderByAttack } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "./Home.module.css"

export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);
    const [orden, setOrden] = useState("");
    const [attack, setAttack] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const filteredPokemons = useSelector((state) => state.filteredPokemons);
    const currentPokemon = filteredPokemons.length ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch])

    // function handleClick(e) {
    //     e.preventDefault();
    //     dispatch(getPokemons());
    // };

    function handleFilteredTypes(e) {
        console.log(e)
        dispatch(filterPokemonsByTypes(e.target.value));
        setCurrentPage(1)
    };

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleAttack(e) {
        e.preventDefault(e);
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setAttack(`Ordenado ${e.target.value}`);
    }

    return (
        <div className={s.container}>
                <SearchBar />
            <div>

                <Link to="/create">
                    <button className={s.butCreat}>CREAR TU POKEMON</button>
                </Link>
                <h1 className={s.h1}>POKEMON</h1>
                {/* <button className={s.butCarg} onClick={e => { handleClick(e) }}>
                CARGAR
            </button> */}
                <div>
                    <div className={s.select}>
                        <select className={s.select1} onChange={handleSort}>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                        </select>
                        <select className={s.select2} onChange={handleAttack}>
                            <option value="+F">+ FUERZA</option>
                            <option value="-F">- FUERZA</option>
                        </select>
                        <select className={s.select3} onChange={handleFilterCreated}>
                            <option value="all" >TODOS</option>
                            <option value="exist">EXISTENTE</option>
                            <option value="create">CREADO</option>
                        </select>
                        <select className={s.select4} onChange={handleFilteredTypes}>
                            <option value="all">TIPO:</option>
                            {
                                types?.map((el, id) => {
                                    return (
                                        <option value={el.name} key={id} > {el.name}  </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className={s.contenedor}>
                        {
                            currentPokemon && currentPokemon.map((el) => {
                                return (
                                    <div className={s.card}>
                                        <Link to={`/pokemons/${el.id}`}>
                                            <Card key={el.id} name={el.name} types={el.types ? el.types : el.tipo} img={el.img ? el.img : "https://4.bp.blogspot.com/-tuWmp9S6hy8/V6Z8-2N2XfI/AAAAAAAA_84/cxrZxgtZV44LD0zF69Xw_uuY7fLPb-URQCLcB/s1600/pikachu-wallpaper.png"} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Paginado
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={filteredPokemons.length || allPokemons.length}
                        paginado={paginado}
                    />
                </div>
            </div>
        </div>
    )
}
