import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './ContactUs.css';
import Input from '../../Common/Input';
import Select from '../../Common/Select';
import Button from '../../Common/Button';
import Textarea from '../../Common/TextArea';

const dropdownOptions = [
  "General Inquiry",
  "Report a Bug",
  "Feature Request",
  "Feedback",
  "Other"
];

let initialData = {
  name: '',
  email: '',
  topic: "",
  message: ''
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ ...initialData });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.topic) {
      newErrors.topic = "Please select a topic.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // no errors → valid
  };

  // -------------------------
  // FORM HANDLERS
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Optional: live error clearing
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // errors displayed automatically
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ ...initialData });
    setErrors({});
    if (nameRef.current) nameRef.current.focus();
  };

  // -------------------------
  // SUBMISSION CONFIRMATION VIEW
  // -------------------------
  if (submitted) {
    return (
      <div className="contact-container">
        <h2 className="contact-title">Successfully Submitted!</h2>
        <p>Thank you for contacting us. You will hear from us in two business days.</p>

        <Button
          label="Back to Home"
          className="home-btn"
          handleClick={() => navigate('/')}
        />
      </div>
    );
  }

  // -------------------------
  // MAIN FORM UI
  // -------------------------
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtext">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>

        {/* NAME */}
        <div className="form-group">
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            handleChange={handleChange}
            ref={nameRef}
            required
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <Input
            id="email"
            name="email"
            placeholder="Enter Email"
            label="Email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            required
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* TOPIC */}
        <div className="form-group">
          <Select
            name="topic"
            label="Topic"
            value={formData.topic}
            onChange={handleChange}
            options={dropdownOptions}
            className={errors.topic ? "error-input" : ""}
            required
          />
          {errors.topic && <p className="error-text">{errors.topic}</p>}
        </div>

        {/* MESSAGE */}
        <div className="form-group">
          <Textarea
            label="Message"
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className={errors.message ? "error-input" : ""}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>

        {/* BUTTONS */}
        <div className="button-group">
          <Button
            id="Submit"
            type="submit"
            label="Submit"
            className="submit-btn"
          />
          <Button
            id="reset"
            type="button"
            label="Reset"
            className="reset-btn"
            handleClick={handleReset}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
