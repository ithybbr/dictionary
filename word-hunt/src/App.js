import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Container, Switch } from "@material-ui/core";
import Header from './Components/Header/Header';
import Definitions from './Components/Definitions/Definitions';
import { withStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';


function App() {
    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState("");
    const [category, setCategory] = useState("en");
    const [LightMode, setsLightMode] = useState(false);
    const [Username, setUsername] = useState(false);
    const DarkMode = withStyles({
        switchBase: {
            color: grey[300],
            "&$checked":{
                color: grey[500],
            },
        },
        checked: {},
        track: {},
    })(Switch);
    const dictionaryApi = async () => {
        try {
            const data = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
            );
            setMeanings(data.data);
        }
        catch (error) {
            console.log(error);
        }
    };
    const name = async () => {
        try {
        const data = await axios({
            url: 'http://localhost/ict%20project/mda/username.php?action=read',
            method: 'get',
            timeout: 8000,
            headers:{
                'Content-Type': 'application/json',
            }
            });
            if(data.status === 200){
                // test for status
                console.log(data.status)
            }    
        setUsername(data.data);
        console.log("username is: ", Username);
    }
    catch(error){
        console.log(error, " something bad happened");
    }
    };
    useEffect(() =>{
        name();
    })
    useEffect(() => {
        dictionaryApi();
    }, [word, category]);
    return (
        <div 
        className="App"
         style=
         {{ height: '100vh',
          backgroundColor: LightMode ? "#fff" : "#282c34",
          color: LightMode ? "black" : "white",
          transition: "all 0.5s linear",
          }}
         >
            <Container
             maxWidth='md'
             style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-evenly" }}
             >
                 <div id = 'mode' style={{position:"absolute", top: 0, right: 15, paddingTop: 10}}>
                     <span>{LightMode?"Dark":"Light"} Mode</span> 
                <DarkMode checked={LightMode} onChange={()=> setsLightMode(!LightMode)}/>
                <span class="logout" style={{position:"absolute", top: 1, left: 0, paddingTop: 40}}>	
				    <a style={{color: LightMode ? "black" : "white", transition: "0.5s linear"}} href="http://localhost/ict%20project/mda/logout.php"> Log Out </a>
                </span>
                 </div>
                <Header
                    category={category}
                    setCategory={setCategory}
                    word={word}
                    setWord={setWord}
                    LightMode={LightMode}
                    Meanings = {meanings}
                />
                {meanings && (<Definitions word = {word}
                 meanings = {meanings}
                  category = {category}
                   LightMode={LightMode}/>)}
        </Container>
    </div>
    );
}

export default App;
