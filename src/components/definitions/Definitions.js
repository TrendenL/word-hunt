import React from 'react'
import './Definitions.css'

export default function Definitions({ word, category, meanings, LightMode }) {
    return (
        <div className='meanings'>

            {meanings[0] && word && category && (
                    <audio 
                    src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio} 
                    styl={{backgroundColor: LightMode ? "#333" : "#fff", borderRadius: 10}}
                    controls
                    >
                        Your Browser doesn't support audio element.
                    </audio>
                )}

            {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
        ) :
                (
                    meanings.map(mean => mean.meanings.map(item => 
                        item.definitions.map(def => 
                            <div className='singleMean' style={{backgroundColor: LightMode ? "#333" : "#fff", color: LightMode ? "#fff" : "#333"}}>
                                <b>{def.definition}</b>
                                <hr style={{backgroundColor: LightMode ? "#fff" : "#333", width: "100%"}}></hr>
                                {
                                    def.example && (
                                        <span>
                                            <b>Example : </b>
                                            {def.example}
                                        </span>
                                    )
                                }
                                {def.synonyms && (
                                    <span>
                                    <b>Synonyms : </b>
                                    {def.synonyms.map(s => `S{s}, `)}
                                </span>
                                )}
                            </div>
                        )
                    ))
                )
            }
        </div>
    )
}
