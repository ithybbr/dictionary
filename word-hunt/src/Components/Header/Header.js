import {createTheme, MenuItem, TextField, ThemeProvider, Button,} from '@material-ui/core';
import React from 'react';
import './Header.css';
import categories from '../../data/category';
import axios from 'axios';
const Header = ({setCategory, category, setWord, word, LightMode, Meanings}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main:LightMode ? "#000" :'#fff',
            },
            type: LightMode ? "light" : 'dark',
        },
    });
    const handleChange = (language) => {
    setCategory(language);
    setWord("");
    };
    return (
        <div className='header'>
            <span className="title">{word ? word: "Word Hunt"}</span>
            <div id = 'error'className="error"></div>
            <div className='inputs'>
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        className="search"
                        label="Search a Word"
                        id="standard-basic"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        className="select"
                        select
                        label="Language"
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        {
                            categories.map((option) => (
                                <MenuItem key={option.label} value={option.label} >{option.value}</MenuItem>
                                ))}
                                                
                    </TextField>
                        <Button variant="outlined" className='btnsave'
                            onClick={check}>
                            Save 
                        </Button>
                </ThemeProvider>
            </div>
        </div>
    )
    function check(){
        //console.log({word});
        const error = document.getElementById("error");
        if(word.trim() !== ''){
        //console.log({Meanings});
        error.innerHTML="";
        postMeanings(); 
        }
        else{
            error.innerHTML="You can't save empty record";
        }
    };
    function postMeanings(){
        let def = document.getElementsByClassName('definitions').item(0);
        let syn = document.getElementsByClassName('synonyms').item(0);
        let exm = document.getElementsByClassName('examples').item(0);
        if(syn === null){
            syn = '';
        }
        if(exm === null){
            exm = '';
        }
        var data = {
            word: word,
            definition: def.textContent,
            synonym: syn.textContent,
            example: exm.textContent
        };
        axios.post('http://localhost/ict%20project/mda/data.php', data)
        .then(function(response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
}

export default Header