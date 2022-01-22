import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, img, types, id }) {
    return (
        <div className={s.container}>

            <div className={s.tipo}>
                <div className={s.card}>
                <h2 className={s.h2}> NOMBRE: {name} </h2>

                <h3 className={s.h3}>TIPO:</h3>
                {types && types.map(el => {
                    //  console.log(el.type)
                    if (el.type?.name) {
                        return <h4 className={s.h4}> {el.type.name} </h4>
                    } if (el.name) {
                        return <h4 className={s.h4}> {el.name} </h4>
                    }
                })}           
            <img className={s.img} src={img} alt="img not found" />
            </div>
            </div>

        </div>
    );
}