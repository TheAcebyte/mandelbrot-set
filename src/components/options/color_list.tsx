import { useEffect } from 'react';
import './color_list.css';

type ColorListProps = {
    getter: string[],
    setter: any,
    base: string[]
}

function ColorList({ getter, setter, base }: ColorListProps) {
    const resetColors = () => {
        setter([...base]);
    }

    const addColor = () => {
        setter([...getter, '#000000']);
    }

    const changeColor = (e: any, index: number) => {
        const color = e.target.value;
        const leftRemaining = getter.slice(0, index);
        const rightRemaining = getter.slice(index + 1, getter.length);

        setter([...leftRemaining, color, ...rightRemaining]);
    }

    const moveColorUp = (index: number) => {
        if (index > 0) {
            const top = getter[index - 1];
            const bottom = getter[index];
            const leftRemaining = getter.slice(0, index - 1);
            const rightRemaining = getter.slice(index + 1, getter.length);
            
            setter([...leftRemaining, bottom, top, ...rightRemaining]);
        }
    }
    
    const moveColorDown = (index: number) => {
        if (index < getter.length - 1) {
            const top = getter[index];
            const bottom = getter[index + 1];
            const leftRemaining = getter.slice(0, index);
            const rightRemaining = getter.slice(index + 2, getter.length);
            
            setter([...leftRemaining, bottom, top, ...rightRemaining]);
        }
    }

    const deleteColor = (index: number) => {
        const leftRemaining = getter.slice(0, index);
        const rightRemaining = getter.slice(index + 1, getter.length);

        setter([...leftRemaining, ...rightRemaining]);
    }

    useEffect(resetColors, []);

    return (
        <div className="option">
            <div className="option-header">
                <h2>Colors</h2>
                <div className="icons-wrapper">
                    <i className='bx bx-reset' onClick={resetColors}></i>
                    <i className='bx bx-list-plus' onClick={addColor}></i>
                </div>
            </div>
            <ul className="colors-wrapper">
                {getter.map((color, index) =>
                    <li key={index}>
                        <div className="identifier">
                            <div className="color-input" style={{backgroundColor: color}}>
                                <input type="color" onChange={(e) => changeColor(e, index)}/>
                            </div>
                            <p>{color}</p>
                        </div>
                        <div className="icons-wrapper">
                            <i className='bx bx-up-arrow-alt' onClick={() => moveColorUp(index)}></i>
                            <i className='bx bx-down-arrow-alt' onClick={() => moveColorDown(index)}></i>
                            <i className='bx bx-trash' onClick={() => deleteColor(index)}></i>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ColorList;