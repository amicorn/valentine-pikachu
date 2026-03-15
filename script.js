// functionality and interactivity of the app. using Babel CDN to allow use of React hooks and JSX in this file without a build step

const { useState } = React;

const noTexts = [
    "No 🥹",
    "Are you sure?",
    "Naurrr don't click me",
    "Pretty pleaseeee",
    "With a cherry on top?",
    "You really wanna do this?",
    "Last chance!",
    "Error: Oops! Button broken. Try the other one :p"
];

function App() {
    const [screen, setScreen] = useState("start");
    const [noPos, setNoPos] = useState({ top: "50%", left: "60%" });
    const [yesScale, setYesScale] = useState(1);
    const [moveCount, setMoveCount] = useState(0);
    const [clickIndex, setClickIndex] = useState(0);

    const playSfx = (file) => {
        const audio = new Audio(`./assets/audio/${file}`);
        audio.play().catch(() => {}); 
    };

    const handleNoHover = () => {
        if (moveCount < 9) {
            playSfx("swish sfx.mp3");
            const x = Math.floor(Math.random() * 60) + 20; 
            const y = Math.floor(Math.random() * 60) + 20;
            setNoPos({ top: `${y}%`, left: `${x}%` });
            setYesScale(prev => prev + 0.3);
            setMoveCount(prev => prev + 1);
        }
    };

    const handleNoClick = () => {
        if (moveCount >= 9) {
            const nextIndex = clickIndex + 1;
            if (nextIndex < noTexts.length - 1) {
                playSfx("pop sfx.mp3");
                setClickIndex(nextIndex);
            } else if (nextIndex === noTexts.length - 1) {
                setClickIndex(nextIndex);
                playSfx("error sfx.mp3");
                setTimeout(() => alert(noTexts[noTexts.length - 1]), 100);
            }
        }
    };

    if (screen === "start") {
        return (
            <div className="container">
                <img src="./assets/you-got-mail-edited2.gif" className="main-img" alt="Mail" />
                <button className="button-pink" onClick={() => { playSfx("pop sfx.mp3"); setScreen("request"); }}>
                    Open mail 💌
                </button>
            </div>
        );
    }

    if (screen === "yay") {
        return (
            <div className="container">
                <h1 className="heading"> Yay!!! 💖 </h1>
                <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                    <img src="./assets/pikachu-ball.gif" style={{width: '150px'}} alt="Pikachu" />
                    <img src="./assets/pikachu-ami-animated-crop.gif" style={{width: '250px'}} alt="Pikachu Happy" />
                </div>
                <h1 className="heading"> Thank you for chu-sing me! 💖</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <img src="./assets/pikachu-valentine.gif" className="main-img" alt="Valentine" />
            <h1 className="heading">Will you be my Valentine?</h1>
            <div className="buttonContainer">
                <button 
                    className="button yesButton" 
                    style={{ transform: `scale(${yesScale})` }}
                    onClick={() => { playSfx("yay sfx.mp3"); setScreen("yay"); }}
                >
                    Yes! 💖
                </button>
                <button
                    className="button noButton"
                    style={{ 
                        top: noPos.top, 
                        left: noPos.left, 
                        transition: moveCount < 9 ? 'all 0.15s ease-out' : 'none' 
                    }}
                    onMouseEnter={handleNoHover}
                    onClick={handleNoClick}
                >
                    {noTexts[clickIndex]}
                </button>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);