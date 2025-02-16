import { useEffect, useState, useRef } from "react";
import "./styles.css";

import mailImg from "./assets/you-got-mail-edited2.gif";
import pikachuHappy from "./assets/pikachu-ami-animated-crop.gif";
import pikachuBall from "./assets/pikachu-ball.gif";
import pikachuValentine from "./assets/pikachu-valentine.gif";
import { motion } from "framer-motion";

import glitterSfx from "./assets/audio/glitter-sound.mp3";
import popSfx from "./assets/audio/pop sfx.mp3";
import errorSfx from "./assets/audio/error sfx.mp3";
import yaySfx from "./assets/audio/yay sfx.mp3";
import swishSfx from "./assets/audio/swish sfx.mp3";

/* User Flow
1. Start screen: "You've got mail!" with "Open mail" button
2. Valentine request screen: "Will chu be my valentine?" with 2 buttons yes and no 
3. Upon detecting hover, "No" button will bounce around screen randomly changing x & y axes positions 
4. Yes button will increase scale up size each attempt at clicking "No" button 
5. After X (const || rng) num times of hovering "No" button, "No" button becomes clickable
6. Clickable "No" button alternates array of funny text 
7. error popup || last string will say "Error: oops! button doesn't work, try other button :p"
8. "Yes" click triggers reward screen "yay!" with animated gifs || my artwork
*/

export default function App() {
  // const mailImg = new URL("./assets/you-got-mail-edited2.gif", import.meta.url)
  //   .href;
  // const pikachuHappy = new URL(
  //   "./assets/pikachu-ami-animated-crop.gif",
  //   import.meta.url
  // ).href;
  // const pikachuBall = new URL("./assets/pikachu-ball.gif", import.meta.url)
  //   .href;
  // const pikachuValentine = new URL(
  //   "./assets/pikachu-valentine.gif",
  //   import.meta.url
  // ).href;

  const [screen, setScreen] = useState("start");
  const [moveCount, setMoveCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [imageIndex, setImageIndex] = useState(1);

  // const playPopSound = () => {
  //   const audio = new Audio(popSfx);
  //   audio.play().catch((error) => console.log("Audio play failed:", error));
  // };

  // const playErrorSound = () => {
  //   const audio = new Audio(errorSfx);
  //   audio.play().catch((error) => console.log("Audio play failed:", error));
  // };

  const glitterAudioRef = useRef(new Audio(glitterSfx));
  const popAudioRef = useRef(new Audio(popSfx));
  const swishAudioRef = useRef(new Audio(swishSfx));
  const errorAudioRef = useRef(new Audio(errorSfx));
  const yayAudioRef = useRef(new Audio(yaySfx));

  useEffect(() => {
    // Preload all audio files on component mount
    glitterAudioRef.current.load();
    popAudioRef.current.load();
    swishAudioRef.current.load();
    yayAudioRef.current.load();

    // Play glitter sound as soon as the component loads
    glitterAudioRef.current
      .play()
      .catch((error) => console.log("Autoplay blocked", error));
  }, []); // Empty dependency array means it runs only once when the component mounts

  const playPopSound = () => {
    popAudioRef.current.currentTime = 0;
    popAudioRef.current.play();
  };

  const playSwishSound = () => {
    swishAudioRef.current.currentTime = 0;
    swishAudioRef.current.play();
  };

  const playErrorSound = () => {
    errorAudioRef.current.currentTime = 0;
    errorAudioRef.current.play();
  };

  const playYaySound = () => {
    yayAudioRef.current.currentTime = 0;
    yayAudioRef.current.play();
  };

  const noTexts = [
    "Are you sure?",
    "Naurrr don't click me",
    "Pretty pleaseeee",
    "With a cherry on top?",
    "You really wanna do this?",
    "Last chance!",
    "Error: Oops! Looks like this button doesn't work. Try the other button :p",
  ];

  const handleNoClick = () => {
    if (clickCount >= 5) {
      playErrorSound();
      alert("Oops! Looks like that button is broken. Try the other one :p");
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const moveNoButton = () => {
    if (moveCount < 9) {
      playSwishSound();
      const randomX = Math.random() * 80 + 10;
      const randomY = Math.random() * 80 + 10;
      setNoPosition({ top: `${randomY}`, left: `${randomX}%` });
      setMoveCount(moveCount + 1);
      setYesSize(yesSize + 0.25);
    }
  };

  useEffect(() => {
    if (screen === "yay") {
      // const audio = new Audio(yaySfx);
      // audio.play().catch((error) => console.log("Audio play failed:", error));
      playYaySound();
    }
  }, [screen]);

  // Loop through pikachu static images to create animation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex % 11) + 1); //restart loop after 11 imgs
    }, 200); //speed in ms

    return () => clearInterval(intervalId);
  }, []);

  const pikachuImageSrc =
    "./assets/pikachu-animation/pikachu-${imageIndex}.jpg";

  if (screen === "start") {
    return (
      <div className="container">
        {/* <h1 className="heading"> You've got mail! </h1> */}
        <img alt="mail" src={mailImg} style={{ width: "500px" }} />
        <button
          className="button button-pink"
          role="button"
          onClick={() => {
            playPopSound();
            setScreen("valentine-request");
          }}
        >
          Open mail 💌
        </button>
      </div>
    );
  }

  if (screen === "yay") {
    return (
      <div className="container">
        <h1 className="heading"> Yay!!! 💖 </h1>
        <img alt="pikachuBall" src={pikachuBall} style={{ width: "200px" }} />
        <img
          alt="pikachu-happy"
          src={pikachuHappy}
          style={{ width: "300px" }}
        />
        <h1 className="heading"> Thank you for chu-sing me, too. 💖</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* <h1 className="heading">Will you be my Valentine? ❤️</h1> */}
      <img
        alt="valentine-request"
        src={pikachuValentine}
        style={{ width: "500px" }}
      />
      <div className="buttonContainer">
        <motion.button
          className="button yesButton"
          style={{ transform: `scale(${yesSize * 1.2})` }}
          onClick={() => {
            playPopSound();
            setScreen("yay");
          }}
        >
          Yes! 💖
        </motion.button>
        <motion.button
          className="button noButton"
          style={{
            position: "absolute",
            top: noPosition.top,
            left: noPosition.left,
          }}
          onClick={() => {
            playPopSound();
            handleNoClick();
          }}
          onMouseEnter={moveNoButton}
        >
          {moveCount < 9
            ? "No 🥹"
            : noTexts[Math.min(clickCount, noTexts.length - 1)]}
        </motion.button>
      </div>
    </div>
  );
}
