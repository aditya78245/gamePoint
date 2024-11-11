import React, { useState, useEffect } from "react";  

const RandomPointApp = () => {  
  const [position, setPosition] = useState(generateRandomPosition());  
  const [randomCharacter, setRandomCharacter] = useState(generateRandomCharacter());  
  const [inputValue, setInputValue] = useState("");  
  const [pointClicked, setPointClicked] = useState(false);  
  const [message, setMessage] = useState("");  

  // Generate a random character  
  function generateRandomCharacter() {  
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  
    const randomIndex = Math.floor(Math.random() * chars.length);  
    return chars[randomIndex];  
  }  

  // Generate a random position for the point  
  function generateRandomPosition() {  
    const top = Math.floor(Math.random() * 90) + "%"; // Random position  
    const left = Math.floor(Math.random() * 90) + "%"; // Random position  
    return { top, left };  
  }  

  // Generate a random color  
  function generateRandomColor() {  
    const letters = '0123456789ABCDEF';  
    let color = '#';  
    for (let i = 0; i < 6; i++) {  
      color += letters[Math.floor(Math.random() * 16)];  
    }  
    return color;  
  }  

  // Handle point click  
  const handlePointClick = () => {  
    setPointClicked(true);  
    setMessage(""); // Clear previous message  
  };  

  // Handle key presses  
  const handleKeyPress = (e) => {  
    const key = e.key; // Get the pressed key  
    // Allow input for alphanumeric characters only  
    if (/^[A-Za-z0-9]$/.test(key)) {  
      setInputValue(key);  
    }  
  };  

  // Handle both click and key press  
  useEffect(() => {  
    if (pointClicked && inputValue === randomCharacter) {  
      // Correct click and guess  
      setRandomCharacter(generateRandomCharacter());  
      setPosition(generateRandomPosition());  
      setInputValue(""); // Reset input value  
      setPointClicked(false); // Reset point clicked state  
    } else if (pointClicked && inputValue !== randomCharacter) {  
      // Incorrect guess  
      setMessage("Please press the point and enter the correct character (A-Z, 0-9)!");  
    }  
  }, [pointClicked, inputValue, randomCharacter]);  

  // Reset pointClicked when the point is clicked again  
  useEffect(() => {  
    if (!pointClicked) {  
      setMessage(""); // Clear message when point is not clicked  
      setInputValue(""); // Reset input value  
    }  
  }, [pointClicked]);  

  // Add event listener for key presses  
  useEffect(() => {  
    window.addEventListener('keypress', handleKeyPress);  
    return () => {  
      window.removeEventListener('keypress', handleKeyPress);  
    };  
  }, []);  

  // Random background color for the character display  
  const randomColor = generateRandomColor();  

  return (  
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>  
      <div style={{  
          width: '100px',  
          height: '100px',  
          display: 'flex',  
          alignItems: 'center',  
          justifyContent: 'center',  
          borderRadius: '50%',  
          backgroundColor: randomColor,  
          color: 'white',  
          fontSize: '48px',  
          fontWeight: 'bold'  
        }}>  
        {randomCharacter}  
      </div>  
      {message && <p style={{ color: "red", marginTop: '20px' }}>{message}</p>}  
      <div  
        onClick={handlePointClick}  
        style={{  
          position: "absolute",  
          top: position.top,  
          left: position.left,  
          width: "20px",  
          height: "20px",  
          backgroundColor: "red",  
          borderRadius: "50%",  
          cursor: "pointer",  
        }}  
      />  
    </div>  
  );  
};  

export default RandomPointApp;

