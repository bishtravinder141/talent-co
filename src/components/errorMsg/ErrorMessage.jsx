const ErrorMessage = ({id, msg}) => {
    return (
        <p id={id} className="text-danger">
            {msg}
        </p>
    );
}

export default ErrorMessage;
