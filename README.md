# Retro J-Chat 🎮💬

Retro J-Chat is a pixel-perfect, social chat application that lets users chat with their friends in real-time. Built with Firebase and React, it features seamless Google sign-in, instant message syncing, and a nostalgic retro aesthetic.

---

## ✨ Features

- ⚡ **Real-Time Messaging**: Powered by Firebase Firestore.
- 🔐 **Google Authentication**: Sign in securely with your Google account.
- 🖼️ **User Avatars**: Messages display profile pictures.
- 🎨 **Retro UI**: Styled with pixel fonts and vibrant colors.
- 🔄 **Sign In/Out**: Manage sessions easily.
- 📱 **Responsive Design**: Optimized for mobile and desktop.

---

## 🧰 Technologies Used

| Tech               | Purpose                               |
|--------------------|----------------------------------------|
| **React**          | UI components                         |
| **Firebase**       | Auth + Firestore database             |
| **React-Firebase Hooks** | Real-time data sync             |
| **CSS**            | Retro-styled interface                |
| **React Icons**    | Social icons                         |

---

## 🚀 Getting Started

### 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- NPM

### 🛠️ Installation

1. **Clone the repo:**
```bash
git clone https://github.com/yourusername/retro-jchat.git
cd retro-jchat
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Firebase:**
   - Create a Firebase project.
   - Enable **Authentication** → Google.
   - Set up **Cloud Firestore**.
   - Create a `.env` file:

```ini
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGE_SENDER_ID=your-sender-id
REACT_APP_APP_ID=your-app-id
REACT_APP_MEASUREMENT_ID=your-measurement-id
```

4. **Start the app:**
```bash
npm start
```

App will be running at: [http://localhost:3000](http://localhost:3000)

---

## 💡 How It Works

### 🔁 App Flow

1. User opens app and signs in with Google.
2. ChatRoom component fetches and displays messages from Firestore.
3. User sends message → it’s instantly added to Firestore.
4. All connected users see the update in real-time.

### 🔍 Key Components

#### 🔐 Authentication
```jsx
const [user] = useAuthState(auth);
```
```jsx
function SignIn() {
  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  return <button onClick={signInWithGoogle}>Sign In with Google</button>;
}
```

#### 💬 ChatRoom
```jsx
const messagesRef = collection(db, 'messages');
const q = query(messagesRef, orderBy('createdAt'), limit(25));
const [messages] = useCollectionData(q, { idField: 'id' });
```

#### ✍️ Sending Messages
```jsx
await addDoc(messagesRef, {
  text: formValue,
  createdAt: serverTimestamp(),
  uid: user.uid,
  photoURL: user.photoURL
});
```

#### 🖼️ ChatMessage
```jsx
const messageClass = msg.uid === auth.currentUser.uid ? 'sent' : 'received';
return (
  <div className={`message ${messageClass}`}>
    <img src={photoURL} alt="avatar" />
    <p>{text}</p>
  </div>
);
```

### 🎨 Styling
Custom CSS + `@media` queries make the UI mobile-friendly:
```css
@media (max-width: 600px) {
  .chat-container {
    font-size: 14px;
    padding: 8px;
  }
}
```

---

## 📱 Usage

- Sign in via Google
- Chat with anyone in the room
- Messages sync instantly
- Sign out anytime

---

## 🛑 Contributing

🚫 This project is not open for contributions. Feel free to **fork** it and make your own version, but no pull requests will be accepted.

---

## 📜 License

This project is **not open-source**. All rights reserved.

---

## 🔗 Social Links

- [GitHub](#)
- [Instagram](#)

---

## 🔄 TL;DR

1. Open app → Sign in
2. Send message
3. Message syncs via Firebase
4. Everyone sees it live
5. Retro chat vibes unlocked 🎮💬

Enjoy chatting in Retro J-Chat! 👾📟

