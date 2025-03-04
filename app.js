import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail,} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRLklls1SDp1rD6_3u8HWFH_cJtR1s1Sc",
    authDomain: "database-95dee.firebaseapp.com",
    projectId: "database-95dee",
    storageBucket: "database-95dee.firebasestorage.app",
    messagingSenderId: "185092331154",
    appId: "1:185092331154:web:024f480ad8c068dcdf384b",
    measurementId: "G-LJVVE3BHB7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign Up with Email/Password
document.getElementById("signup-btn")?.addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Sign Up Successful!");
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Login with Email/Password
document.getElementById("login-btn")?.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful!");
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Continue with Google
document.getElementById("google-btn")?.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Login Successful!");
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged Out Successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Reset Password
document.getElementById("reset-password-link")?.addEventListener("click", (e) => {
  e.preventDefault(); 
  const email = prompt("Please enter your email address:");

  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  } else {
    alert("Please enter a valid email address.");
  }
});

// Show User Email on Welcome Page
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("welcome.html")) {
    document.getElementById("user-email").textContent = user.email;
  } else if (!user && window.location.pathname.includes("welcome.html")) {
    window.location.href = "index.html";
  }
});