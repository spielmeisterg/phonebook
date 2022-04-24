const Notification = ({notification}) => {
    if(notification === null){
        return null
    }
    const errorStyle = {
        color: "red",
        backgroundColor: "#ffacac",
        border: "1px solid red",
        padding: 15,
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 10
    }
    const succesStyle = {
        color: "green",
        backgroundColor: "#b0ffb5",
        border: "1px solid green",
        padding: 15,
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 10
    }
    return(
        <div style={notification.type === "error"? errorStyle : succesStyle}>
            {`notification is of type ${notification.type} and the message is: ${notification.message}`}
        </div>
    )
}

export default Notification