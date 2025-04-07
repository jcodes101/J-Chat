# Retro J-Chat

Retro J-Chat is a social chat application where users can chat with their friends in real-time. The app uses Firebase for authentication and real-time messaging, providing a seamless experience where messages appear instantly as they're sent. Users can sign in using their Google account, and the app includes a retro aesthetic with interactive UI elements.

## Features

- **Real-Time Messaging**: Chat with friends in real-time using Firebase Firestore.
- **Google Authentication**: Sign in using Google account.
- **Interactive UI**: Retro design with animated elements and hover effects.
- **Message Display**: View messages with the user's profile picture.
- **Sign-In/Sign-Out**: Manage user sessions with sign-in and sign-out functionality.
- **Responsive Design**: Mobile-friendly and adaptable to various screen sizes.

## Technologies Used

- **React**: For building the UI components.
- **Firebase**: For authentication, Firestore database, and real-time updates.
- **CSS**: Styling the components to create a visually appealing retro design.
- **React-Firebase Hooks**: To manage Firebase authentication and Firestore data in real-time.
- **React Icons**: For including social media icons (GitHub, Instagram) in the UI.

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:
- Node.js (version 14 or later)
- NPM (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/retro-jchat.git
   cd retro-jchat
Install dependencies:

bash
Copy
Edit
npm install
Set up Firebase:

Create a Firebase project at Firebase Console.

Enable Firebase Authentication (Google Sign-In).

Set up Firestore database.

Add your Firebase configuration to a .env file in the root of the project.

Example .env file:

ini
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGE_SENDER_ID=your-sender-id
REACT_APP_APP_ID=your-app-id
REACT_APP_MEASUREMENT_ID=your-measurement-id
Run the app:

bash
Copy
Edit
npm start
The app will be available at http://localhost:3000.

Usage
Once signed in with Google, you can start chatting with your friends in the chat room.

The app updates in real-time, so new messages appear instantly.

You can sign out from the app by clicking the "Sign Out" button.

Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

Fork the repository

Create a new branch (git checkout -b feature-branch)

Make your changes and commit them (git commit -am 'Add feature')

Push to the branch (git push origin feature-branch)

Open a pull request

License
This project is open-source and available under the MIT License.

Social Links
GitHub

Instagram

Enjoy chatting in Retro J-Chat! 🚀

vbnet
Copy
Edit

Make sure to replace `yourusername` and Firebase config variables with the actual information relevant to your project.
