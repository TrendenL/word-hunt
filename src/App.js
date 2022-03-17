import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Switch } from '@material-ui/core'
import "./style.css"
import Header from './components/header/Header'
import Definitions from './components/definitions/Definitions'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/styles'


export default function App() {

    const [ word, setWord ] = useState("")
    const [ meanings, setMeanings ] = useState("")
    const [ category, setCategory ] = useState("en")
    const [ LightMode, setLightMode ] = useState(false)

    const ThemeSwitch = withStyles({
    switchBase: {
        color: grey[300],
        '&$checked': {
        color: grey[500],
        },
        '&$checked + $track': {
        backgroundColor: grey[500],
        },
    },
    checked: {},
    track: {},
    })(Switch);

    // const dictionaryApi = async() => {
    //     try {
    //         const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
    //         setMeanings(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    // function dictionaryApi(){
    //     axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
    //     .then(res => setMeanings(res.data))
    //     .catch(err => console.log(err))
    // }

    useEffect(() => {
        const dictionaryApi = async() => {
            try {
                const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
                setMeanings(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        dictionaryApi()
    }, [category, word])

    return (
        <div style={{height: "100vh", backgroundColor: LightMode ? "#fff" : "#282c34", color: LightMode ? "#333" : "#fff", transition: "all 0.5s linear"}}>
            <Container maxWidth="md" style={{display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-evenly"}}>

                <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
                    <span>{LightMode ? "Dark" : "Light"} Mode</span>
                    <ThemeSwitch checked={LightMode} onChange={() => setLightMode(!LightMode)}/>
                </div>

                <Header category={category} setCategory={setCategory} word={word} setWord={setWord} LightMode={LightMode}/>

                {meanings && (
                    <Definitions
                        meanings={meanings}
                        word={word}
                        category={category}
                        LightMode={LightMode}
                    />
                )}
            </Container>
        </div>
    )
}
