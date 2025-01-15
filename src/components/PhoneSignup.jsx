import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXQ-nImS_L4lkbjlYK6-GN8PTMg-fqzDw",
    authDomain: "nadlan-oversight.firebaseapp.com",
    projectId: "nadlan-oversight",
    storageBucket: "nadlan-oversight.firebasestorage.app",
    messagingSenderId: "522310369317",
    appId: "1:522310369317:web:cd2957f2ff257a8ea0bfcc",
    measurementId: "G-WE6L7DPJ8Y"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const PhoneSignup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[+][1-9]{1}[0-9]{3,14}$/; // International format
    return phoneRegex.test(phone);
  };

  const mapFirebaseError = (errorCode) => {
    const errorMap = {
      'auth/invalid-phone-number': 'Invalid phone number. Please try again.',
      'auth/quota-exceeded': 'Too many requests. Please try later.',
      'auth/user-disabled': 'User account disabled.',
      'auth/operation-not-allowed': 'Phone authentication not enabled.',
    };
    return errorMap[errorCode] || 'An unknown error occurred.';
  };

  const sendOtp = async () => {
    setError("");
    setSuccess("");

    if (!isValidPhoneNumber(phone)) {
      setError("Invalid phone number format.");
      return;
    }

    setLoading(true);
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });

      const result = await firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier);
      setConfirmationResult(result);
      setSuccess("OTP sent successfully!");
    } catch (error) {
      setError(mapFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!confirmationResult) {
      setError("Please request OTP first.");
      return;
    }

    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setSuccess("Phone number verified successfully!");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Phone Signup</h1>

      <div id="recaptcha-container"></div>

      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
      />
      <button onClick={sendOtp} disabled={loading}>Send OTP</button>

      {confirmationResult && (
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />
          <button onClick={verifyOtp} disabled={loading}>Verify OTP</button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default PhoneSignup;