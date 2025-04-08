# Retro J-Chat 💬🕹️

Retro J-Chat is a social chat application where users can chat with their friends in real-time. The app uses Firebase for authentication and real-time messaging, providing a seamless experience where messages appear instantly as they're sent. Users can sign in using their Google account, and the app includes a retro aesthetic with interactive UI elements.

## 🚀 Features

- **Real-Time Messaging**: Chat with friends in real-time using Firebase Firestore.
- **Google Authentication**: Sign in using Google account.
- **Interactive UI**: Retro design with animated elements and hover effects.
- **Message Display**: View messages with the user's profile picture.
- **Sign-In/Sign-Out**: Manage user sessions with sign-in and sign-out functionality.
- **Responsive Design**: Mobile-friendly and adaptable to various screen sizes.

## 🔧 Key Technologies

| Tool/Lib         | Purpose                                      |
|------------------|----------------------------------------------|
| **React**        | Frontend UI framework                        |
| **Firebase**     | Auth (Google sign-in) + Firestore database   |
| **React Hooks**  | Manage state and Firebase listeners          |
| **React Icons**  | Display social icons                         |
| **Custom CSS**   | Styling and mobile responsiveness            |

## 💡 Purpose

Your app is a real-time chat application with a retro vibe that lets users:
- Sign in with Google
- Send & receive messages
- See others’ names and profile pictures
- Syncs all of that in real-time using Firebase

## 🛠️ App Structure & Flow

### a. Firebase Initialization
```javascript
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
```
- Connects your app to Firebase with environment variables.
- `auth` handles user login/logout.
- `firestore` is the real-time NoSQL database storing messages.

### b. Authentication (Sign In / Sign Out)
```javascript
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
```
- `SignIn()` renders a button → Opens Google popup → Firebase logs user in.
- `SignOut()` logs user out when clicked.
- `useAuthState(auth)` keeps track of the signed-in user.

### c. ChatRoom() Component
This is the core of the app.

#### Query Firestore messages
```javascript
const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
```
- Fetches the 25 most recent messages and listens for live updates.

#### Send a message
```javascript
await addDoc(messagesRef, {
  text: formValue,
  createdAt: serverTimestamp(),
  uid,
  photoURL,
  displayName
});
```
- Adds the message to Firestore with the user info and timestamp.

#### Auto scroll
```javascript
dummy.current.scrollIntoView({ behavior: 'smooth' });
```
- Scrolls to the bottom after a message is sent.

### d. ChatMessage() Component
Displays each message:
```jsx
<div className={`message ${messageClass}`}>
  <img src={photoURL} />
  <p><span>{displayName}</span> said:</p>
  <p>{text}</p>
</div>
```
- Compares `uid` to determine if message was sent or received.
- Shows profile picture, display name, and message text.

### e. UI/Styling
- Retro fonts, icons, and animated background (Squares component).
- Responsive layout with `@media` queries to support mobile screens.

## 🔄 Real-Time Sync
Thanks to Firebase Firestore:
- Messages sent by one user show up instantly for all users.
- Managed by the `useCollectionData` hook from `react-firebase-hooks`.

## ⚡ TL;DR — How It Works
1. User opens app → sees sign-in screen.
2. User signs in with Google.
3. App displays chatroom + their name.
4. User sends messages → stored in Firestore.
5. All connected users get updates instantly.

App uses Firebase Auth to track users, Firestore for live chat, and React for UI. 🎨💬

## 🚫 Contributing
This repository is not open for contributions. Please do not create pull requests. You are welcome to fork and modify your own version.

## 📄 License
This project is not open-source. All rights reserved.

## 🔗 Social Links
- GitHub
- Instagram

Enjoy chatting in Retro J-Chat! 🕹️📡

