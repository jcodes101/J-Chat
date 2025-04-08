// npm run start

// CSS imports
import './App.css';
import Squares from './Squares';
import { FaGithubSquare } from 'react-icons/fa';
import { ImInstagram } from "react-icons/im";

// useState manages local component state and Ref is a reference to a DOM element
// Used for interacting and tracking values
import { useState } from 'react';
import { useRef } from 'react';

// Initializes firebase app using configuration object
// This is needed to connect this app to Firebase severvices. (Auth + Firestore)
import { initializeApp } from 'firebase/app';
// Gets the Firebase Authentication instance
// This is used to manage users... (sign in, sign out, etc.)
import { getAuth } from 'firebase/auth';

// This is to listen to the authentication state of the user
// Gives real-time user status and renders when it changes
import { useAuthState } from 'react-firebase-hooks/auth';
// This is for listening to a Firestore collection in real-time
// Automatically updates the UI when the Firestore data changes
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Enables Google sign-in and opens a popup for the user to sign in (or other providers)
// Needed to allows sign in with Google
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// addDoc writes data to Firestore
// collection gets a reference to a Firestore collection
// query, orderBy, limit are used to controlhow you get/read data
// getFirestore initializes the Firestore database
// serverTimestamp is used to set the timestamp when the message was sent
import { addDoc, collection, query, orderBy, limit, getFirestore, serverTimestamp } from "firebase/firestore";

// Firebase configuration
// This is the configuration object for Firebase
// It contains the API key, project ID, and other necessary information
// to connect to the Firebase project
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// Initializes Firebase using the configuration object that contains the API key, auth domain, project ID, etc.
// connects the frontend to the Firebase project in the cloud
const app = initializeApp(firebaseConfig);
// Ties authentication to the app | tracks user state
const auth = getAuth(app);
// initializes cloud Firestore (noSQL database) for storing and syncing data
// needed to read and write data to the Firestore database
const firestore = getFirestore(app);

function App() {

  // Initialize Firebase Authentication and get a reference to the service
  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal' // up, down, left, right, diagonal
        borderColor='#fff'
        hoverFillColor='#222'
      />


      <div className="content-container">

        <div className="socials-container">

          <a target="_blank" href="https://github.com/jcodes101" rel="noopener noreferrer">
            <FaGithubSquare className="github-icon"/>
          </a>

          <a target="_blank" href="https://www.instagram.com/gtsjadin/" rel="noopener noreferrer">
            <ImInstagram className="instagram-icon"/>
          </a>
        </div>

        <header className="App-header">
          <h2 className="jchat-header">Retro J-Chat</h2>
          <p className="welcome-p">Welcome to the "Retro J-Chat" room!</p>
          <p className="welcome-p">{user ? `Hello, ${user.displayName}` : 'Please sign in'}</p>
        </header>
      
        <section>
          {/* If user is signed out, show the sign-in button */}
          {user ? <SignOut /> : <SignIn />}

          {/* If user is signed in, show the chat room, and show the sign-out button */}
          {user ? <ChatRoom /> : <SignOut />}
        </section>
      </div>

    </div>
  );
}

// SignIn component
function SignIn() {

  // Sign in with Google
  // This function is called when the user clicks the sign-in button
  // It uses the GoogleAuthProvider to sign in the user with a popup
  // The signInWithPopup function is imported from the firebase/auth module
  // The auth variable is the Firebase Authentication instance
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  return (
    // Sign-in button
    // This button calls the signInWithGoogle function when clicked
    <div className="sign-in-container">
      <button onClick={signInWithGoogle} className="sign-in-btn">Sign in with Google</button>
    </div>
  )
}

function SignOut(){

  return auth.currentUser && (
    <div className="sign-out-container">
      <button onClick={() => auth.signOut()} className="sign-out-btn">Sign Out</button>
    </div>
  )
}

function ChatMessage(props) {

  // destructuring the message object into the message content, user id, and users profile picture
  const {text, uid, photoURL, displayName} = props.message;
  // hooks to get the current logged in user | makes sure you're comparing the current user and message sender
  //* const [user] = useAuthState(auth);
  // compares if the messages uid is the same as the current user's id
  // if so it will be 'sent', otherwise it will be 'received'
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img className="user-imgs" src={photoURL} alt="user profile"/>
      <p 
      className="user-name-container">
      <span className="user-name-name">{displayName || "Anonymous"}</span> said:</p>
      <p>{text}</p>
    </div>
  )
}

function ChatRoom() {

  // creates a reference to the dummy element
  // this is used to scroll to the bottom of the chat when a new message is sent
  const dummy = useRef();
  // points to the messages collection in Firestore
  const messagesRef = collection(firestore, "messages")
  // builds a query to get the messages from Firestore
  // messages are ordered by the createdAt field and gets the 25 most recent
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  // useCollectionData listens to the messages in real time, it updates messages when firestore data changes
  const [messages] = useCollectionData(messagesQuery, {idField: 'id'});
  // a state varible for the message input form
  // formValue is the current text type of the user
  // setFormValue is a function that updates the formValue state
  const [formValue, setFormValue] = useState('');

  // defines the async function to handle message for submission
  const sendMessage = async (e) => {
    // prevents the page from being reloaded when a form is submitted
    e.preventDefault();

    // this prevents empty or whitespace messages from being sent
    if (!formValue.trim()) return;

    // deconstrocts the current useers user id and profile picture
    const {uid, photoURL, displayName} = auth.currentUser;

    // adds a new mesage to the message collection in Firestore
    await addDoc(messagesRef,{
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName
    })
    // resets the form value to an empty string after the message is sent
    setFormValue('');

    // auto scrolls to the bottom of the chat when a new message is sent
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return(
    <>
      <div className="chat-container">

        <main className="chat-messages">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
          <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
          className="chat-form-input"
          placeholder="Type here..."
          />
          <button className="submit-txt-btn" type="submit">𐦟</button>
        </form>
      </div>

      <div className="sign-out-container">
        <button onClick={() => auth.signOut()} className="sign-out-btn">Sign Out</button>
      </div>

    </>
  )
}

export default App;