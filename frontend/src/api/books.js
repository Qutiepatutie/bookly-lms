export async function getBooks({ generalSearch="", category=""}) {
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