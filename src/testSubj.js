import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

export default function GetFilms(){

    let Films = []
    const a = [
        {
            filmId: 1,
            name: "Marvel"
        }
    ]

    const b = [
        {
            filmId: 1,
            name: "Marvel2"
        }
    ]

    const [films, setFilms] = useState([]);
    
    async function fetchFilms(){
        let firstFilms = [];
        let secondFilms = [];

        function setFilms(get, set){
            get = set
        }


        // await fetch("https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",{
        //     method: "get"
        // })
        // .then((response) => response.blob())
        // .then((a) => setFilms(firstFilms, a))
        // .catch((error) => console.log(error))

        // await fetch("https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",{
        //     method: "get"
        // })
        // .then((response) => response.blob())
        // .then((b) => setFilms(secondFilms, b))
        // .catch((error) => console.log(error))

        for(let x of a){
            for(let c of b){
                if(x.filmId === c.filmId){
                    c.filmId = uuidv4();
                }
            }
        }
        Films = [...a, ...b];
    }

    function sortFilms(){
        Films = Films.sort(function (a, b) {
                if (a.filmName > b.filmName) {
                    return 1;
            }
                if (a.filmName< b.filmName) {
                    return -1;
            }
                return 0;
            })
        
    }

    function ShowFilmsList({films}){
        return films.map((item) => {
            return(
                <div key={item.filmId}>
                    {item.name}
                </div>
            )
        })
    }

    useEffect(() => {
        fetchFilms();
    }, [])

    useEffect(() => {
        sortFilms()
    }, [films])


    return(
        <div>
            <ShowFilmsList films={Films}/>
        </div>
    )
}