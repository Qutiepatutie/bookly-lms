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