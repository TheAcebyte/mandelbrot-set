import { useState, useEffect } from 'react';
import Slider from './slider.tsx';
import './settings.css';

const baseSettings = {
    maxIterations: 100,
    colors: [
        "#421e0f",
        "#19071a",
        "#09012f",
        "#040449",
        "#000764",
        "#0c2c8a",
        "#1852b1",
        "#397dd1",
        "#86b5e5",
        "#d3ecf8",
        "#f1e9bf",
        "#f8c95f",
        "#ffaa00",
        "#cc8000",
        "#995700",
        "#6a3403"
    ]
}

function Settings() {
    const [maxIterations, setMaxIterations] = useState(100);
    const [colors, setColors] = useState(['#321322', '#321322', '#321322']);

    const changeColor = (e: any, index: number) => {
        const color = e.target.value;
        const left = colors.slice(0, index);
        const right = colors.slice(index + 1, colors.length);

        const result = left.concat([color].concat(right));
        setColors(result);
    }

    useEffect(() => {
        setColors(baseSettings.colors);
    }, []);

    return (
        <div className="settings-wrapper">
            <div className="top-wrapper">
                <div className="title">
                    <i className='bx bxs-cog'></i>
                    <h1>Settings</h1>
                </div>

                <div className="option">
                    <div className="option-header">
                        <h2>Max Iterations</h2>
                        <p className="stat">{maxIterations}</p>
                    </div>
                    <Slider setter={setMaxIterations} base={baseSettings.maxIterations} min={10} max={200} step={1}/>
                </div>

                <div className="option">
                    <div className="option-header">
                        <h2>Colors</h2>
                    </div>
                    <ul className="colors-wrapper">
                        {colors.map((color, index) =>
                            <li key={index}>
                                <div className="identifier">
                                    <div className="color-input" style={{backgroundColor: color}}>
                                        <input type="color" onChange={(e) => changeColor(e, index)}/>
                                    </div>
                                    <p>{color}</p>
                                </div>
                                <div className="buttons">
                                    <i className='bx bx-down-arrow-alt'></i>
                                    <i className='bx bx-up-arrow-alt'></i>
                                    <i className='bx bx-trash'></i>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="bottom-wrapper">
                <button id="reset">Apply Settings</button>
            </div>
        </div>
    );
}

export default Settings;