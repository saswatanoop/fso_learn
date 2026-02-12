const Notification = ({ message, type }) => {

    if (message)
        return <div className={`notification ${type}`}>{message}</div>

    return null;
}

export default Notification;
