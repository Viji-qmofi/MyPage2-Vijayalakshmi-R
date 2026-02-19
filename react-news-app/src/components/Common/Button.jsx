const Button = ({ id, type, label, className, handleClick }) => {
    return (
        <button id={id} type={type} className={className} onClick={handleClick} >
            {label}
        </button>
    );
};

export default Button;