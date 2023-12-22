import React, { useState, useEffect } from 'react';
import './OnboardingPage.css';

const ConversationState = {
    WELCOME: 'welcome',
    AREAS: 'areas',
    TOPICS: 'topics',
    WHY_TOPICS: 'why_topics',
    EXPERTISE: 'expertise',
    SCOPE: 'scope',
    FREQUENCY: 'frequency',
    OTHER: 'other',
    FINAL: 'final'
};
const OnboardingPage = () => {
    const welcomeMessage = {
        text: "Hi there! I'm Avery. Welcome to Research Digest. I'd love to learn about your interests so I can put together a personalized newsletter for you.",
        sender: 'bot',
        username: 'Avery - Content Curator',
        iconUrl: '/contentCurator.jpeg'
    };

    const [messages, setMessages] = useState([welcomeMessage]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [conversationState, setConversationState] = useState(ConversationState.AREAS);
    const [userInterests, setUserInterests] = useState({
        interests: [],
        whyTopics: '', //text response
        expertise: '', //make this number 1-5?
        detailed: false, //true is overview, false is in-depth
        daily: false //true for daily, false for weekly
    });
    const [initialTopicsGiven, setInitialTopicsGiven] = useState(false);
    const [renderAreas, setRenderAreas] = useState(false);
    const [currentArea, setCurrentArea] = useState(null);
    const [prevArea, setPrevArea] = useState(null);

    useEffect(() => {
        console.log('State updated:', userInterests);
    }, [userInterests]); // This effect runs whenever userInterests changes

    

    const botMessage = (text) => ({
        text,
        sender: 'bot',
        username: 'Avery - Content Curator',
        iconUrl: '/contentCurator.jpeg'
    });

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
            handleConversation(input);
            setInput('');
        }
    };

    const handleTopics = (userInput, currentArea) => {
        const topics = userInput.split(',').map(topic => topic.trim());
            
        setUserInterests(prevInterests => ({
             ...prevInterests,
            interests: prevInterests.interests.map(interest => 
                interest.area === currentArea ? { ...interest, topics: topics } : interest
            )
        }));
    };

    const handleConversation = (userInput) => {
        setIsBotTyping(true);
        setTimeout(() => {
            setIsBotTyping(false);
            let nextMessageText = '';
            switch (conversationState) {
                case ConversationState.AREAS:
                    nextMessageText = "First off, what general areas of research light you up? You know, like healthcare, physics, AI - whatever gets you excited. I want to know what you're passionate about.";
                    setConversationState(ConversationState.TOPICS);
                    break;
                case ConversationState.TOPICS:
                    if (!renderAreas) {
                        setRenderAreas(true);
                        const areas = userInput.split(',').map(area => area.trim());
                        const interestsWithNullTopics = areas.map(area => ({
                            area: area,
                            topics: null
                        }));

                        setUserInterests(prevInterests => ({
                            ...prevInterests,
                            interests: interestsWithNullTopics
                        }));
                    } 

                    setPrevArea(currentArea);

                    const interestWithNullTopics = userInterests.interests.find(interest => interest.topics === null); //finds the interest with null topic
                    const currArea = interestWithNullTopics ? interestWithNullTopics.area : null; //gets the area of the interest with null topic
                    setCurrentArea(currArea);
                    
                    console.log('currentArea', currentArea)

                    
                    if (currentArea) {
                        nextMessageText = `Okay, now thinking specifically about ${currentArea}, what topics in that area really capture your curiosity?`;

                    } else {
                        nextMessageText = "rip?";
                    }

                    if (initialTopicsGiven) {
                        handleTopics(userInput, prevArea);
                    } else {
                        setInitialTopicsGiven(true);
                    }
                    
                    const countNullTopics = userInterests.interests.filter(interest => interest.topics === null).length;
                    if (countNullTopics === 1) {
                        setConversationState(ConversationState.WHY_TOPICS);
                    }
                    
            
                    
                    break;
                case ConversationState.WHY_TOPICS:
                    handleTopics(userInput, currentArea);

                    nextMessageText = `Tell me a bit more about why fascinate you. The more details the better so I can fine tune your newsletter!`;
                    setConversationState(ConversationState.EXPERTISE);
                    break;
                case ConversationState.EXPERTISE:
                    setUserInterests({ ...userInterests, whyTopics: userInput });
                    nextMessageText = "Let me ask - would you consider yourself pretty knowledgeable about any of the topics we just discussed? I want to get a sense of where you are starting from in terms of background knowledge. Rate each topic from 1-5, where at 1 you are completely new to the topic and at 5 you're a total expert.";
                    setConversationState(ConversationState.SCOPE);
                    break;
                case ConversationState.SCOPE:
                    setUserInterests({ ...userInterests, expertise: userInput.toLowerCase() });
                    nextMessageText = "And when you're learning about this stuff, are you looking to go super in-depth? Or do you prefer a more general overview to start with?";
                    setConversationState(ConversationState.FREQUENCY);
                    break;
                case ConversationState.FREQUENCY:
                    setUserInterests({ ...userInterests, detailed: userInput.toLowerCase().includes("in-depth") });
                    nextMessageText = `Great! We'll send you personalized updates about ${userInterests.researchAreas.join(', ')} right to your inbox. How often would you like us to send you The Research Digest?`
                    setConversationState(ConversationState.OTHER);
                    break;
                case ConversationState.OTHER:
                    setUserInterests({ ...userInterests, daily: userInput.toLowerCase().includes("daily") });
                    nextMessageText = "Let me know if you have any other requests for the type of content you want to see. I'm here to make this newsletter perfect for you! Anything else on your mind?";
                    setConversationState(ConversationState.FINAL);
                    break;
                case ConversationState.FINAL:
                    setUserInterests({ ...userInterests, other: userInput });
                    nextMessageText = "Awesome! Thanks for chatting with me. I'll get to work on your personalized newsletter right away. Keep a lookout for your first issue!";
                    setConversationState(ConversationState.WELCOME);
                    break;
                default:
                    nextMessageText = "I'm not sure how to respond to that. Could you please repeat?";
            }

            setMessages(currentMessages => [...currentMessages, botMessage(nextMessageText)]);
        }, 3000);
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