import { useState } from 'react';
import './Form.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


async function getFromAPI(name) {
        try {
            const res = await fetch("http://127.0.0.1:5000/ai/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ location: name }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error! Status code: ${res.status}`);
            }

            const data = await res.json();
            console.log("Response from API:", data);

            // Assume response is like { message: "hello" }
            return data.advice; 
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;         
        }
}

function Form() {
    
    const [location, setLocation] = useState('');

    const [adviceText, setAdviceText] = useState('');

    const [showAdvice, setShowAdvice] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const advice = await getFromAPI(location);
            setAdviceText(advice);
            setShowAdvice(true)
        } catch (err) {
            setAdviceText(`Failed to fetch advice. Error: ${err}`);
            setShowAdvice(true)
        }

        // getFromAPI(text);
    }

    const handleBack = () => {
        setShowAdvice(false);
        setAdviceText('');
        setLocation('');
    }

    return (


        <>
            {!showAdvice ? (
                <div className='center'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={ location } onChange={(e) => setLocation(e.target.value)} placeholder='Enter your location' className='panel-entry'/>
                        <button type='submit' className='subback'>Get Advice</button>
                    </form>
                </div> 
            ) : (
                <div className='center'>
                    <h1 className='advTitle'>Advice:</h1><br />
                    <div className='font'>
                        <Markdown remarkPlugins={[remarkGfm]} >
                        {adviceText}
                        </Markdown>
                    </div>
                    
                    <button onClick={handleBack} className='subback'>Go Back</button>
                </div>
            )}
        </>

    );
}

export default Form;