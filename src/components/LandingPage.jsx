import React from "react";
import {Link} from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
    return(
        <div className={s.container}>
        <div>
            <h1>Bienvenidos al mundo Pokemon</h1>
            <Link to="/home">
                <button className={s.button}>Ingresar</button>
            </Link>
        </div>
        </div>
    )
}