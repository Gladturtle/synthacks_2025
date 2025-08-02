function getFromAPI(name) {
    fetch('127.0.0.1:5000')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status code: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("An Error Occurred! Error: ", error);
        });
}

function List({n}) {
    


    return (

        <div>
            <p>Something here</p>
        </div>

    );

}

export default List;