import { useState } from 'react';
import './Form.css';


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
                        <input type="text" value={ location } onChange={(e) => setLocation(e.target.value)} placeholder='Enter your location'/>
                        <button type='submit'>Get Advice</button>
                    </form>
                </div> 
            ) : (
                <div>
                    <h1>Advice:</h1><br />
                    <p>{adviceText}</p>
                    <button onClick={handleBack}>Go Back</button>
                </div>
            )}
        </>

    );
}

export default Form;