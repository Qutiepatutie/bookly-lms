/* export async function getBooks({ generalSearch="", category=""}) {
    let url = "http://127.0.0.1:8000/books?";

    if (generalSearch) {
        url += `generalsearch=${encodeURIComponent(generalSearch)}`;
    } else if (category) {
        url += `category=${encodeURIComponent(category)}`;
    }

    const res = await fetch(url);

    if(!res.ok) {
        throw new Error("Failed to fetch books");
    }
    return await res.json();
} */

export async function getBooks() {
    const resp = await fetch("http://127.0.0.1:8000/getBooks/");

    if(!resp.ok){
        throw new Error("Failed to fetch Books");
    }

    const data = await resp.json();

    return data;
}


export async function viewBookInfo(work_key) {
    const resp = await fetch(`http://127.0.0.1:8000/viewBook/?work_key=${work_key}`);

    if(!resp.ok){
        throw new Error("Failed to retrieve data");
    }

    const data = await resp.json();
    
    if(!data){
        return null;
    }

    return data;
}

export async function autofillBookInfo(isbn) {
    const resp = await fetch(`http://127.0.0.1:8000/autofill/?isbn=${isbn}`);

    if(!resp.ok){
        throw new Error("Failed to retrieve data");
    }

    const data = await resp.json();
    
    if(!data){
        return null;
    }

    return data;
}

export async function addBook(data){
  const response = await fetch('http://127.0.0.1:8000/addBook/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}