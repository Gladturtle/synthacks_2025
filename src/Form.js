import { useState } from 'react';



function Form() {
    
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The text you entered was: ${text}`);
    }

    return (


        <>
            <div className='center'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter your name here!<br></br>
                    </label>
                    <input type="text" value={ text } onChange={(e) => setText(e.target.value)} placeholder='Enter your name'/>
                </form>
            </div> 
        </>

    );
}

export default Form;