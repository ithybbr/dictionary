import React from 'react'
import './Definitions.css';

const Definitions = ({word, meanings, category, LightMode}) => {
    return(
    <div className="meanings">
        {
            meanings[0] && word && category=== 'en' && (
                <audio
                 src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                  style={{ backgroundColor: '#fff', borderRadius: 50, width: "100%"}}
                  controls
                  >
                Your browser does not support audio.
                </audio>
            )
        }
        {word ===""?(
        <span className='subTitle'>
            Start by typing a word in Search
        </span>) :  (
                meanings.map((mean) => (
                    mean.meanings.map((item) => (
                         item.definitions.map((def) => (
                         <div className = "singleMean"
                          style={{backgroundColor:LightMode ? "#3b5360" : "white", color:LightMode ? "white" : "black"}}
                         >  
                        <div className='definitions'><b>{def.definition}</b></div>
                        <hr style={{backgroundcolor: "black", width:"100%"}}/>
                        {
                            def.example && (<span>
                                <b>Example: </b>
                                <span className='examples'>{def.example}</span>
                            </span>)
                        }
                        {
                            def.synonyms && (<span>
                                <b>Synonyms: </b>
                                <span className='synonyms'>
                                    {def.synonyms.map((s) => `${s}, `)}
                                </span>
                            </span>)}
                         </div>
                         ))
                    ))
                ))
        )}
    </div>
    ); 
};

export default Definitions
