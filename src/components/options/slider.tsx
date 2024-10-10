import { useEffect, useRef } from 'react';
import { getMin, getMax, mapInt } from '../../libs/utils.ts';
import './slider.css';

type SliderProps = {
    getter: number,
    setter: any,
    base: number,
    min: number,
    max: number,
    step: number
}

function Slider({ getter, setter, base, min, max, step }: SliderProps) {
    const active = useRef<boolean>(false);
    const setActive = (value: boolean) => active.current = value;

    const sliderRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const fillerRef = useRef<HTMLDivElement>(null);

    const startSlider = (x: number) => {
        setActive(true);
        moveSlider(x);
    }

    const moveSlider = (x: number) => {
        if (active.current) {
            const sliderRect = sliderRef.current!.getBoundingClientRect();
            const boundedX = getMin(getMax(x - sliderRect.x, 0), sliderRect.width);
            const value = mapInt(boundedX, 0, sliderRect.width, min, max, step);
            updateSlider(value);
        }
    }
    
    const updateSlider = (value: number) => {
        setter(value);
        const left = mapInt(value, min, max, 2.5, 97.5);
        const width = mapInt(value, min, max, 0, 100);

        circleRef.current!.style.left = `${left}%`;
        fillerRef.current!.style.width = `${width}%`;
    }

    const stopSlider = () => {
        if (active.current) {
            setActive(false);
        }
    }

    const startSliderMouse = (e: any) => startSlider(e.clientX);
    const startSliderTouch = (e: any) => startSlider(e.touches[0].clientX);
    const moveSliderMouse = (e: any) => moveSlider(e.clientX);
    const moveSliderTouch = (e: any) => moveSlider(e.touches[0].clientX);
    
    useEffect(() => {
        updateSlider(base);

        window.addEventListener('mousemove', moveSliderMouse);
        window.addEventListener('touchmove', moveSliderTouch);
        window.addEventListener('mouseup', stopSlider);
        window.addEventListener('touchend', stopSlider);

        return () => {
            window.removeEventListener('mousemove', moveSliderMouse);
            window.removeEventListener('touchmove', moveSliderTouch);
            window.removeEventListener('mouseup', stopSlider);
            window.removeEventListener('touchend', stopSlider);
        }
    }, []);

    return (
        <div className="option">
            <div className="option-header">
                <h2>Max Iterations</h2>
                <p className="stat">{getter}</p>
            </div>
            <div className="slider" ref={sliderRef} onMouseDown={startSliderMouse} onTouchStart={startSliderTouch}>
                <div className="circle" ref={circleRef}></div>
                <div className="filler" ref={fillerRef}></div>
            </div>
        </div>
    );
}

export default Slider;