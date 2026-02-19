const Textarea = ({ label, name, value, onChange, placeholder, rows, required }) => {
  return (
    <>
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows || 5}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      ></textarea>
    </>
  );
};

export default Textarea;
