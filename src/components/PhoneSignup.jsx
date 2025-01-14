import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Check, Loader2, Phone } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './Card';
import './PhoneSignup.css';

const PhoneSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState('phone'); // phone, otp, success
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('otp');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.some((digit) => digit === '')) {
      setError('Please enter the complete OTP.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('success');
  };

  return (
    <div className="phone-signup-container">
      <Card className="phone-signup-card">
        <CardHeader className="phone-signup-header">
          <CardTitle>
            {step === 'success' ? 'Welcome!' : 'Sign Up'}
          </CardTitle>
          <CardDescription>
            {step === 'phone' && 'Enter your phone number to get started.'}
            {step === 'otp' && 'Enter the verification code sent to your phone.'}
            {step === 'success' && 'Your account has been created successfully.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {/* Phone Number Input */}
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit}>
                <div className="input-container">
                  <Phone className="icon" size={20} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="phone-input"
                    placeholder="Enter phone number"
                    maxLength={10}
                  />
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                  {loading ? (
                    <Loader2 className="loader-icon" size={20} />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* OTP Input */}
            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit}>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="otp-input"
                      maxLength={1}
                    />
                  ))}
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                  {loading ? (
                    <Loader2 className="loader-icon" size={20} />
                  ) : (
                    <>
                      <span>Verify</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="success-container">
                <div className="success-icon">
                  <Check size={32} />
                </div>
                <p className="success-message">You're all set!</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="error-container">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneSignup;
