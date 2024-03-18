
"use client"
import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Router from "next/router";
import firebaseApp from "../../app/firebaseConfig"; // Import initialized Firebase app
import { useRouter } from "next/navigation";

const auth = getAuth(firebaseApp); // Use the imported Firebase app

// Configure authentication UI options
const uiConfig = {
  signInSuccessUrl: "/dashboard",
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        // Optional custom parameters for Google Sign-In
        // You can adjust these according to your needs
        prompt: "select_account" // Forces account selection even when one account is available
      }
    },
    GithubAuthProvider.PROVIDER_ID // Simply add the GitHub provider ID
  ]
};

function SignInScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // Initialized with false

  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      'size': 'normal',
      'callback': (response) => {

      },
      'expired-callback': () => {

      }
    });
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value); // Corrected typo in function name
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };
  
  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber(''); // Corrected typo in variable name
      alert('OTP has been sent');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp('');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {!otpSent ? (
          <div id="recaptcha-container"></div>
        ) : null}
        <input 
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter Phone number"
          className="border border-gray-500 p-2 rounded-md"
        />
        <input 
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
          className="border border-gray-500 p-2 rounded-md"
        />
        <button
          onClick={otpSent ? handleOTPSubmit : handleSendOtp}
          className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md m-2`}
          style={{ backgroundColor: otpSent ? 'green' : 'blue' }}
        >
          {otpSent ? 'Submit OTP' : 'Send OTP'}
        </button>
      </div>
      <div style={{ maxWidth: "320px" }}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </>
  );
}

export default SignInScreen;
