import React, { useState } from "react";
import "../CSS/Form1.css";

const Form1 = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "",
    guestName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name.trim() === "" ||
      values.email.trim() === "" ||
      values.age.trim() === "" ||
      values.attendingWithGuest.trim() === ""
    ) {
      alert("Please fill require fields.");
      return;
    }
    if (values.attendingWithGuest === "yes" && values.guestName.trim() === "") {
      alert("Enter Guest Name.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Event Registration</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={values.age || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form">
            <label>Are you attending with a guest?</label>
            <select
              name="attendingWithGuest"
              value={values.attendingWithGuest || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {values.attendingWithGuest === "yes" && (
            <div className="form">
              <label>Guest Name</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName || ""}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Summary</h2>
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Age:</strong> {values.age}
          </p>
          <p>
            <strong>Attending with Guest:</strong> {values.attendingWithGuest}
          </p>
          {values.attendingWithGuest === "yes" && (
            <p>
              <strong>Guest Name:</strong> {values.guestName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Form1;
