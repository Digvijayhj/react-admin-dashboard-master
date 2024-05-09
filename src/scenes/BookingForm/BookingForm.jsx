import React, { useState } from 'react';
import './BookingForm.css'; // Your existing CSS file

const BookingForm = ({ onSubmitBooking, onClose }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        userName: '',
        paymentAmount: '',
        duration: '',
        paymentType: '',

        // ... other fields ...
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        switch (name) {
            case 'userName':
                if (!value.trim()) return 'User name cannot be empty';
                break;
            case 'paymentAmount':
                if (!value.trim()) return 'Payment amount cannot be empty';
                if (isNaN(value)) return 'Payment amount must be a number';
                if (Number(value) <= 0) return 'Payment amount must be more than 0';
                break;
            case 'studentId':
                if (!value.trim()) return 'Student ID cannot be empty';
                break;
            case 'paymentType':
                if (!value) return'Select a payment type';
                break;
            case 'duration':
                if (!value) return 'Select the duration of the slot';
                break;
            // ... other field validations...
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the form data
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Check and update the error state
        const error = validate(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Set the field to touched
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        // Check and update the error state
        const error = validate(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = Object.keys(formData).reduce((acc, key) => {
            const error = validate(key, formData[key]);
            if (error) {
                acc[key] = error;
            }
            return acc;
        }, {});

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; // Prevent the form from submitting
        }

        // No errors, submit the form
        onSubmitBooking(formData);
    };

    return (
        <div className="booking-form-container">
            <div className="booking-form">
                <button className="form-close-icon" onClick={onClose}>&times;</button>
                <h2>Book Game</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="studentId"
                        placeholder="Student ID"
                        value={formData.studentId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.studentId && errors.studentId ? 'input-error' : ''}
                    />
                    {touched.studentId && errors.studentId && <p className="error-message">{errors.studentId}</p>}

                    <input
                        type="text"
                        name="userName"
                        placeholder="Name"
                        value={formData.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.userName && errors.userName ? 'input-error' : ''}
                        aria-describedby="userNameError"
                    />

                    {touched.userName && errors.userName && (
                        <p className="error-message" id="userNameError">{errors.userName}</p>
                    )}
                    <input
                        type="text"
                        name="paymentAmount"
                        placeholder="Payment Amount"
                        value={formData.paymentAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.paymentAmount && errors.paymentAmount ? 'input-error' : ''}
                        aria-describedby="paymentAmountError"
                    />
                    {touched.paymentAmount && errors.paymentAmount && (
                        <p className="error-message" id="paymentAmountError">{errors.paymentAmount}</p>
                    )}

                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.paymentType && errors.paymentType ? 'input-error' : ''}
                    >
                        <option value="">Select Payment Type</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        {/* ... other payment types ... */}
                    </select>
                    {touched.paymentType && errors.paymentType && <p className="error-message">{errors.paymentType}</p>}

                    <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.duration && errors.duration ? 'input-error' : ''}
                    >
                        <option value="">Select Duration</option>
                        <option value="30">30 min</option>
                        <option value="60">1 hour</option>
                        {/* ... other durations ... */}
                    </select>
                    {touched.duration && errors.duration && <p className="error-message">{errors.duration}</p>}

                    {/* ... other input fields ... */}
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    );
};

export default BookingForm;
