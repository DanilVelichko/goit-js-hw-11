const BASE_URL = '';


const postToAdd = {
  author: "Mango",
  body: "CRUD is awesome",
};

///* GET ///
export const getItems = () => {
    return fetch(`${BASE_URL}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then((data) => {
            console.log('Get DATA>>>>', data);
        })
        .catch(error => console.log(error));
};

export const getItemById = (BASE_URL, itemId) => {

    return fetch(`${BASE_URL}${itemId}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then((data) => {
            console.log('Get DATA>>>>', data);
        })
        .catch(error => console.log('ERROR getItemById', error));
    
};

///* POST ///
export const postItem = (item) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(item),
    
    };
    return fetch(BASE_URL, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(console.log(data))
        .catch(error => { console.log('Error postItem', error); });
};
// postItem({ title: 'new' });

///* PATCH ///
export const patchtItem = (itemToUpdate, bookId) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(itemToUpdate),
    
    };
    return fetch(`${BASE_URL}${bookId}`, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(console.log(data))
        .catch(error => { console.log('Error patchtItem', error); });
};
// patchtItem({ title: 'new', }, 1);


///* PUT ///
export const putItem = (item) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(item),
    
    };
    return fetch(BASE_URL, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(console.log(data))
        .catch(error => { console.log('Error putItem', error); });
};

///* DELETE ///

export const deleteItem = (itemId) => {
    const url = `${BASE_URL}${itemId}`;
    const options = {
        method: 'DELETE',
            
    };
    return fetch(url, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .catch(error => { console.log('Error deleteItem', error); });
};

// deleteItem(1);