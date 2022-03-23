import React, { useState } from 'react';
import './ColorBox.scss'

ColorBox.propTypes = {

};

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'black', 'blue', 'green'];
    const randomIndex = Math.floor(Math.random() * COLOR_LIST.length);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initialColor = localStorage.getItem('box_color') || 'deeppink';
        return initialColor;
    })

    const handleColorChange = () => {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    }

    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleColorChange}
        >

        </div>
    );
}

export default ColorBox;