import { useState, useEffect, useRef } from 'react';
import Slider from './options/slider.tsx';
import ColorList from './options/color_list.tsx';
import './settings.css';

type settingsProps = {
    iterGetter: number,
    iterSetter: any,
    colorGetter: string[],
    colorSetter: any
    zoomGetter: number,
    zoomSetter: any
}

const baseSettings = {
    maxIterations: 100,
    zoomMultiplier: 2,
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

function Cogs({ parentRef }: { parentRef: any }) {
    const [active, setActive] = useState(false);
    const foregroundCogRef = useRef<HTMLElement>(null);
    const backgroundCogRef = useRef<HTMLElement>(null);
    
    const slideSettings = () => {
        const value = active ? -100 : 0;
        const angle = active ? 0 : 360;

        parentRef.current!.style.translate = `${value}%`;
        foregroundCogRef.current!.style.rotate = `${angle}deg`;
        backgroundCogRef.current!.style.rotate = `${-angle}deg`;

        setActive(!active);
    }

    return (
        <>
            <i className='bx bxs-cog' id="foreground-cog" ref={foregroundCogRef} onClick={slideSettings}></i>
            <i className='bx bxs-cog' id="background-cog" ref={backgroundCogRef}></i>
        </>
    );
}

function Settings({ iterGetter, iterSetter, colorGetter, colorSetter, zoomGetter, zoomSetter }: settingsProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [maxIterations, setMaxIterations] = useState(iterGetter);
    const [zoomMultiplier, setZoomMultiplier] = useState(zoomGetter);
    const [colors, setColors] = useState(colorGetter);
    
    useEffect(() => {
        iterSetter(baseSettings.maxIterations);
        zoomSetter(1 / baseSettings.zoomMultiplier);
        colorSetter(baseSettings.colors);
    }, []);

    const applySettings = () => {
        iterSetter(maxIterations);
        zoomSetter(1 / zoomMultiplier);
        colorSetter(colors);
    }

    return (
        <div className="settings-wrapper" ref={wrapperRef}>
            <div className="top-wrapper">
                <div className="title">
                    <h1>Settings</h1>
                </div>
                <Slider name="Max Iterations" getter={maxIterations} setter={setMaxIterations} base={baseSettings.maxIterations} min={10} max={200} step={1} precision={0}/>
                <Slider name="Zoom Multiplier" getter={zoomMultiplier} setter={setZoomMultiplier} base={baseSettings.zoomMultiplier} min={0.25} max={10} step={0.25} precision={2}/>
                <ColorList getter={colors} setter={setColors} base={baseSettings.colors}/>
            </div>

            <div className="bottom-wrapper">
                <button id="reset" onClick={applySettings}>Apply Settings</button>
            </div>

            <Cogs parentRef={wrapperRef}/>
        </div>
    );
}

export default Settings;