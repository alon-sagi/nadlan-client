import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import PhoneSignup from './components/PhoneSignup';
import './App.css';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXQ-nImS_L4lkbjlYK6-GN8PTMg-fqzDw",
  authDomain: "nadlan-oversight.firebaseapp.com",
  projectId: "nadlan-oversight",
  storageBucket: "nadlan-oversight.firebasestorage.app",
  messagingSenderId: "522310369317",
  appId: "1:522310369317:web:cd2957f2ff257a8ea0bfcc",
  measurementId: "G-WE6L7DPJ8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.useDeviceLanguage();

// ---
function App() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => {
        console.error('Error fetching health:', err)
        setError(err.message)
      })
  }, [])

  return (
    <>
      <PhoneSignup /> 
    </>
  )
}

export default App