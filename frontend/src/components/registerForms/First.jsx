export default function First({ handleChange, registerData }){
    return (
        <>
            <label>First Name</label>
            <input
                type="text"
                name="first_name"
                value={registerData?.first_name}
                onChange={handleChange}
                />

            <label>Middle Name</label>
            <input
                type="text"
                name="middle_name"
                value={registerData?.middle_name}
                onChange={handleChange}
                />

            <label>Last Name</label>
            <input
                type="text"
                name="last_name"
                value={registerData?.last_name}
                onChange={handleChange}
                />
        </>
    )
}