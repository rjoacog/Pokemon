import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemons } from "../actions";
import s from "./PokemonCreate.module.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "ESTE CAMPO ES OBLIGATORIO"
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const types = useSelector((state) => state.types);
    // const error = useSelector((state) => state.error)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        vida: 0,
        fuerza: 0,
        velocidad: 0,
        defensa: 0,
        altura: 0,
        peso: 0,
        tipo: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            tipo: [...input.tipo, e.target.value]
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemons(input));
        // alert("POKEMON CREADO");
        setInput({
            name: "",
            vida: 0,
            fuerza: 0,
            velocidad: 0,
            defensa: 0,
            altura: 0,
            peso: 0,
            tipo: []
        })
        // history.push("/home")
    };

    function handleDelete(el) {
        setInput({
            ...input,
            tipo: input.tipo.filter(tip => tip !== el)
        })
    }


    return (
        <div className={s.container}>
            <Link to="/home">
                <button className={s.button}>HOME</button>
            </Link>
            <h1>CREAR TU POKEMON</h1>
            <form onSubmit={handleSubmit}>
                <div className={s.form}>
                    <label>NOMBRE:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {
                        errors.name &&
                        (<p className="error"> {errors.name} </p>)
                    }
                </div>
                <div className={s.number}>
                    <label>VIDA:</label>
                    <input
                        type="number"
                        value={input.vida}
                        name="vida"
                        onChange={handleChange}
                    />
                </div>
                <div className={s.number}>
                    <label>FUERZA:</label>
                    <input
                        type="number"
                        value={input.fuerza}
                        name="fuerza"
                        onChange={handleChange}
                    />
                </div>
                <div className={s.number}>
                    <label>VELOCIDAD:</label>
                    <input
                        type="number"
                        value={input.velocidad}
                        name="velocidad"
                        onChange={handleChange}
                    />
                </div>
                <div className={s.number}>
                    <label>DEFENSA:</label>
                    <input
                        type="number"
                        value={input.defensa}
                        name="defensa"
                        onChange={handleChange}
                    />
                </div>
                <div className={s.number}>
                    <label>ALTURA:</label>
                    <input
                        type="number"
                        value={input.altura}
                        name="altura"
                        onChange={handleChange}
                    />
                </div>
                <div className={s.number}>
                    <label>PESO:</label>
                    <input
                        type="number"
                        value={input.peso}
                        name="peso"
                        onChange={handleChange}
                    />
                </div>
                {/* <div className={s.inpImg}>
                    <label>IMAGEN:</label>
                    <input type="image"
                    name="imagen"
                    />
                </div>
                 */}
                {/* <img className={s.img} src="https://4.bp.blogspot.com/-tuWmp9S6hy8/V6Z8-2N2XfI/AAAAAAAA_84/cxrZxgtZV44LD0zF69Xw_uuY7fLPb-URQCLcB/s1600/pikachu-wallpaper.png" /> */}
                <div className={s.number}>
                    <select onChange={e => handleSelect(e)}>
                        <option value="all">TIPOS:</option>
                        {
                            types?.map(el =>
                                <option value={el.name}> {el.name}  </option>
                            )
                        }
                    </select>
                </div>
                {input.tipo.map(el =>
                    <div className={s.tipo}>
                        <p> {el} </p>
                        <input type="button" value="X" onClick={() => handleDelete(el)} />
                    </div>
                    )
                }  
                    <button className={s.butCreat} type="submit" >CREAR POKEMON</button>

               
            </form>
            {/* {
                error
            } */}
        </div>
    )

}