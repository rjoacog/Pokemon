import axios from "axios";
import { bindActionCreators } from "redux";

export function getPokemons() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/pokemons");
        // console.log(json);
        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data,
        })
    }
};

export function getTypes() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/types");
        //console.log(json)
        return dispatch({
            type: "GET_TYPES",
            payload: json.data
        })
    }
};

export function filterPokemonsByTypes(payload) {
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
};

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
};

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByAttack(payload) {
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
};

export function getPokemonName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            // console.log(json)
            return dispatch({
                type: "GET_NAME_POKEMON",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function postPokemons(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/pokemons", payload)
            // dispatch({
            //     type: "ERROR",
            //     payload: ""
            // })
        console.log(response)
         alert("POKEMON CREADO")
        return response;
        } catch (error) {
            // dispatch({
            //     type: "ERROR",
            //     payload: error.response.data.message
            // })
            alert(error.response.data.message)
            console.log(typeof error)
            console.log(error.status)
        }
        
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/pokemons/" + id)
            // console.log(json);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function removerDetailPokemons() {
    return {
        type: "REMOVE_DETAIL_POKEMONS",
    }
}

