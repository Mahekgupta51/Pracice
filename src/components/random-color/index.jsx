import { useCallback, useEffect, useState } from "react";

export default function RandomColor() {
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('');



    const randomColorUtility = useCallback((length) => Math.floor(Math.random() * length), []);

    const handleGenerateRandomColor = useCallback(() => {
        let newColor;
        if (typeOfColor === 'hex') {
            const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            newColor = `#${Array(6).fill(0).map(() => hex[randomColorUtility(hex.length)]).join('')}`;
        } else {
            const r = randomColorUtility(256);
            const g = randomColorUtility(256);
            const b = randomColorUtility(256);
            newColor = `rgb(${r} ${g} ${b})`;
        }
        setColor(newColor);
    }, [typeOfColor, randomColorUtility]);

    useEffect(() => {
        handleGenerateRandomColor();
    }, [typeOfColor, handleGenerateRandomColor]);


    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: color
        }}>
            <button onClick={handleGenerateRandomColor}>Generate Random Color</button>
            <button onClick={() => setTypeOfColor('hex')}>Generate Hex Color</button>
            <button onClick={() => setTypeOfColor('rgb')}>Generate RGB Color</button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "60px",
                    marginTop: "50px",
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
}