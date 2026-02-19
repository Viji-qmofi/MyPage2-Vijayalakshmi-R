
const Select = ({ label, name, value, onChange, options, required }) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>

      <div className="select-wrapper">
        <select name={name} value={value} onChange={onChange} required={required}>
          <option value="" disabled>-- Select a Topic --</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
