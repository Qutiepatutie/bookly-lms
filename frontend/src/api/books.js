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

export async function autofillBookInfo(isbn){
    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];

    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const today = `${month} ${day}, ${year}`;

    const resp1 = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const data1 = await resp1.json();
    const bookData1 = data1[`ISBN:${isbn}`];
    
    if(!bookData1) return { message: "no book found"};

    const workKey = bookData1.key.split("/")[2];
    const resp2 = await fetch(`https://openlibrary.org/books/${workKey}.json`)
    const bookData2 = await resp2.json();

    const subjectNames = bookData1.subjects || [];
    const subjects = [ ...new Set(subjectNames.map(s => s.name.trim()))];

    const publishDate = bookData1.publish_date || "";
    const yearPublished = publishDate.replaceAll(/[^0-9]/g, "").slice(-4) || "Unknown";

    return {
        message : "book found",
        title : bookData1.title || "Unknown",
        author : bookData1.authors?.[0]?.name ||"Unknown",
        edition : bookData2.edition_name || "Unknown",
        description : bookData2.description?.value || "None",
        publisher : bookData1.publishers?.[0]?.name || "Unknown",
        year_published : yearPublished,
        date_acquired : today,
        pages : bookData1.number_of_pages || bookData1.pagination || "Unknown",
        tags : subjects,
        book_cover_url : `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` || "None"
    };
}