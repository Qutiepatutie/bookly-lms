import close from "../assets/close-icon.svg"

import styles from "../styles/viewbook.module.css"

export default function ViewBook({viewBook, setViewBook}) {
    return (
        <>
            <div className={viewBook ? styles.container : styles.hidden}>
                <div className={styles.viewBook}>
                    <div className={styles.bookCover}>
                        <div className={styles.coverPlaceholder} />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.infoHeader}>
                            <div>
                                <h2>Book Title Placeholder</h2>
                                <h4 className={styles.author}>Book author placeholder</h4>
                            </div>
                        </div>
                        <hr style={{marginTop: "10px"}}/>
                        <p className={styles.description}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore quas delectus nobis distinctio cupiditate maxime nisi. Voluptate in explicabo tempore itaque, pariatur sint voluptatum quibusdam. Eum assumenda facilis quae cum? <br/><br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae est aliquam dolores iure expedita numquam voluptatum distinctio possimus explicabo, quibusdam perspiciatis repellendus? Iusto, architecto commodi corrupti eum sequi cumque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi molestias, tenetur accusantium excepturi, minima, dicta quidem eius omnis non soluta repudiandae delectus nostrum. Architecto error ducimus molestiae nobis dignissimos quas. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem recusandae alias excepturi, officiis aliquam quis libero quas, fugit, sint deleniti amet totam velit dicta asperiores qui. Tenetur non officiis voluptatibus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo voluptas velit quae delectus officiis, ipsam, mollitia sint ex natus ratione vero maxime rem minus porro, doloremque debitis et! Incidunt, labore.
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>{"CN PLACEHOLDER"}</p>
                            <p><span>ISBN:</span>{"ISBN PLACEHOLDER"}</p>
                            <p><span>PAGES:</span>{"PAGES PLACEHOLDER"}</p>
                            <p><span>PUBLISHER:</span>{"PUBLISHER PLACEHOLDER"}</p>
                            <p><span>YEAR PUBLISHED:</span>{"YEAR PLACEHOLDER"}</p>
                            <p><span>GENRE:</span>{"GENRE PLACEHOLDER"}</p> 
                        </div>
                        
                    </div>
                    <img src={close} className={styles.close} onClick={() => setViewBook(false)}/>
                    <button className={styles.borrowButton}>Borrow Book</button>
                </div>
            </div>
        </>
    )
}