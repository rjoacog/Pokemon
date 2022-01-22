
const initialState = {
    pokemons: [],
    types: [],
    filteredPokemons: [],
    details: [],
    error: "",
}


function rootReducer(state = initialState, actions) {
    switch (actions.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: actions.payload
            };
        case "GET_NAME_POKEMON":
            const filterNamePokemon = [actions.payload]
            return {
                ...state,
                filteredPokemons: filterNamePokemon
            }
        case "POST_POKEMON":
            return {
                ...state
            }           
        case "GET_TYPES":
            return {
                ...state,
                types: actions.payload
            }
        case "FILTER_BY_TYPE":
            const allPokemons = state.pokemons;
            const typesFiltered = actions.payload === "all" ? [] : allPokemons.filter((el) => {
               // console.log(el.types)
               if(el.types){ 
                return el.types.some(tp => tp.type.name === actions.payload)
               } if(el.tipo) {
                return el.tipo.some(tp => tp.name === actions.payload)
               }         
            });
            return {
                ...state,
                filteredPokemons: typesFiltered
            };
        case "FILTER_CREATED":
            const allPokemonsCreated = state.pokemons;
            const createdFiltered = actions.payload === "create" ? allPokemonsCreated.filter(el => el.createdInDb) : allPokemonsCreated.filter(el => !el.createdInDb);
            return {
                ...state,
                filteredPokemons: actions.payload === "all" ? []  : createdFiltered
            };
        case "ORDER_BY_NAME":
            if(!state.filteredPokemons.length) {
                let sortedArr = actions.payload === "asc" ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return - 1
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state, 
                    pokemons: sortedArr
                };
            } else {
                let sortedArr = actions.payload === "asc" ?
                state.filteredPokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return - 1
                    }
                    return 0
                }) :
                state.filteredPokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state, 
                    filteredPokemons: sortedArr
                };
            }          
            case "ORDER_BY_ATTACK":
                if(!state.filteredPokemons.length) {
                    let attackArr = actions.payload === "+F" ? 
                    state.pokemons.sort(function (a,b) {
                        if (a.fuerza > b.fuerza) {
                            return -1
                        }
                        if(b.fuerza > a.fuerza) {
                            return 1
                        }
                        return 0 
                    }) :
                    state.pokemons.sort(function(a, b) {
                        if(a.fuerza > b.fuerza) {
                            return 1
                        }
                        if(b.fuerza > a.fuerza) {
                            return -1
                        }
                        return 0
                    });
                    return {
                        ...state,
                        pokemons: attackArr,
                    }   
                } else {
                    let attackArr = actions.payload === "+F" ? 
                    state.filteredPokemons.sort(function (a,b) {
                        if (a.fuerza > b.fuerza) {
                            return -1
                        }
                        if(b.fuerza > a.fuerza) {
                            return 1
                        }
                        return 0 
                    }) :
                    state.filteredPokemons.sort(function(a, b) {
                        if(a.fuerza > b.fuerza) {
                            return 1
                        }
                        if(b.fuerza > a.fuerza) {
                            return -1
                        }
                        return 0
                    });
                    return {
                        ...state,
                        filteredPokemons: attackArr,
                    }   
                };
            case "GET_DETAIL":
                return {
                    ...state,
                    details: actions.payload
                };
            case "REMOVE_DETAIL_POKEMONS":
                return {
                    ...state,
                    details: []
                } 
            case "ERROR":
                return {
                    ...state,
                    error: actions.payload
                }         
        default: {
            return state;
        }
    }
}

export default rootReducer;