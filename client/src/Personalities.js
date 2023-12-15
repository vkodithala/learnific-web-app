import React, { useState } from "react";
import './Personalities.css';

const Personalities = () => {
  const [selectedWriter, setSelectedWriter] = useState(null);

  // Create a data structure for writers
  const glowEffectClass = "glow";
  const writersData = [
    {
      id: "writer1",
      name: "Dr. Isabella Clarke",
      image: "/IsabellaClarke.jpeg",
      description: "Greetings, I'm Professor Avery, your academic compass. Precision is my game, distilling complex research into concise, authoritative summaries. For the scholarly at heart, let's delve into discovery with elegance and expertise.",
    },
    {
      id: "writer2",
      name: "Leo Hart",
      image: "/LeoHeart.jpeg",
      description: "Hi, I'm Leo! Think of me as your research buddy who turns jargon into fun, digestible insights. Ready for some light-hearted yet enlightening chats about science? Let's make learning a breeze together!",
    },
    {
      id: "writer3",
      name: "Samira Byte",
      image: "/SamiraByte.jpeg",
      description: "Hey, I'm Samira. I deliver the essentials of research—quick and clear. If you're looking for straight-to-the-point updates, I'm your go-to. Let's skip the fluff and keep you ahead, efficiently.",
    },
  ];

  const handleWriterSelect = (writerId) => {
    setSelectedWriter(writerId);
  };

  return (
    <div className="body">
      {/* New header and description at the top */}
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        color: "#004e7f",
        marginBottom: "20px",
      }}>The Research Digest</h2>
      <p style={{
        fontSize: "18px",
        color: "#555",
        marginBottom: "40px",
      }}>Choose your own writer for our daily newsletters</p>

      <div className="writers">
        {writersData.map((writer) => (
          <div  className={`writer ${selectedWriter === writer.id ? glowEffectClass : ''}`} key={writer.id} onClick={() => handleWriterSelect(writer.id)}>
            <img src={writer.image} alt={writer.name}/>
            <h2>{writer.name}</h2>
            <p>
              {writer.description} {/* Show the entire description */}
            </p>
          </div>
        ))}
      </div>
      {selectedWriter && (
        <>
          <div className="example-newsletter">
            <h3>Example Newsletter by {selectedWriter}</h3>
            <p>Content of the example newsletter...</p>
          </div>
          <button className="confirm-button">Confirm</button>
        </>
      )}
    </div>
  );
};

export default Personalities;
