import React, { useState } from 'react';
import './OnboardingPage.css';

const OnboardingPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);

    const botMessage = {
        text: 'Yes',
        sender: 'bot',
        username: 'Avery - Content Curator',
        iconUrl: '/contentCurator.jpeg'
    };

    const userMessage = (input) => ({
        text: input,
        sender: 'user',
        username: 'User',
        iconUrl: '/user.jpeg'
    });

    const sendMessage = (event) => {
        event.preventDefault();
        if (input.trim() !== '') {
            setMessages([...messages, userMessage(input)]);
            setInput('');
            setIsBotTyping(true); // Show typing indicator

            setTimeout(() => {
                setIsBotTyping(false); // Hide typing indicator
                setMessages((currentMessages) => [...currentMessages, botMessage]); // Add bot message
            }, 3000); // Wait for 3 seconds
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.logo}>The Research Digest</h1>
                <p style={styles.directions}>Answer the questions from our content curator Avery to get your own personalized research feed</p>
            </header>
            <div style={styles.chatContainer}>
                <div style={styles.chatBox}>
                    {messages.map((message, index) => (
                        <div key={index} style={message.sender === 'user' ? { ...styles.message, ...styles.messageUser } : styles.message}>
                            <div style={message.sender === 'user' ? styles.messageHeaderUser : styles.messageHeaderBot}>
                                <img src={message.iconUrl} alt="icon" style={styles.icon} />
                                <span style={styles.username}>{message.username}</span>
                            </div>
                            {message.text}
                        </div>
                    ))}
                    {isBotTyping && (
                        <div style={styles.typingIndicator}>
                            <div style={styles.dot}></div>
                            <div style={styles.dot}></div>
                            <div style={styles.dot}></div>
                        </div>
                    )}
                </div>
                <form style={styles.inputForm} onSubmit={sendMessage}>
                    <input
                        type="text"
                        style={styles.inputField}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <button type="submit" style={styles.sendButton}>Send</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        marginBottom: '20px'
    },
    logo: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '20px'
    },
    directions: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '20px'
    },
    chatContainer: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    chatBox: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        background: '#f9f9f9'
    },
    message: {
        padding: '10px',
        borderBottom: '1px solid #eaeaea',
        color: '#333',
        textAlign: 'left'
    },
    messageUser: {
        textAlign: 'right'
    },
    messageHeaderUser: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '5px'
    },
    messageHeaderBot: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '5px'
    },
    icon: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginRight: '5px'
    },
    username: {
        fontWeight: 'bold'
    },
    inputForm: {
        display: 'flex',
        padding: '10px',
        background: '#fff'
    },
    inputField: {
        flexGrow: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        marginRight: '10px'
    },
    sendButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer'
    },
    typingIndicator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px'
    },
    dot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#007bff',
        borderRadius: '50%',
        margin: '0 5px',
        animation: 'bounce 1.4s infinite ease-in-out both'
    }
};

// Remember to add the keyframes for the bounce animation in your CSS file
/*
@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1.0); }
}
*/

export default OnboardingPage;
