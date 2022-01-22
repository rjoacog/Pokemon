import React from "react";
import s from "./Paginado.module.css";


export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    };
    // console.log(pageNumbers)
    return (
        <nav>
            <ul className={s.paginado}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <div className={s.lista}>
                                <li className={s.number} key={number}><a onClick={() => paginado(number)}> {number} </a> </li>
                            </div>
                        )
                    })
                }
            </ul>
        </nav>

    )
}