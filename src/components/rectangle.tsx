import { Animation } from 'konva/lib/Animation'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Stage, Layer, Rect, Circle, Star } from 'react-konva'

const Demo = () => {
  const rectRef = useRef()
  const [blink, setBlink] = useState(false)
  const [rectPosition, setRectPosition] = useState({
    x: 90,
    y: 110
  })
  const [rectColor, setRectColor] = useState('blue')
  const [circlePosition, setCirclePosition] = useState({
    x: 80,
    y: 110,
    color: 'blue'
  })
  const [circleColor, setCircleColor] = useState('blue')

  useEffect(() => {
    if (!blink) {
      return;
    }

    const period = 300;

    var anim = new Animation(frame => {
      rectRef.current.opacity((Math.sin(frame.time / period) + 1) / 2);
    }, rectRef.current.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  })

  const changeColorRect = () => {
    setRectColor('red')
  }

  const changeColorCircle = () => {
    setCircleColor('#343434')
  }

  return (
      <div style={{background: '#ccc'}}>
        <input
          type="checkbox"
          checked={blink}
          onChange={e => {
            setBlink(e.target.checked);
          }}
        />{" "}
        Animtion?
        
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
              <Rect
                width={50}
                height={50}
                x={rectPosition.x}
                y={rectPosition.y}
                fill={rectColor}
                strokeWidth={2}
                stroke="#000"
                onClick={changeColorRect}
                draggable
              />
              <Circle
                width={50}
                height={50}
                x={circlePosition.x}
                y={circlePosition.y}
                fill={circleColor}
                strokeWidth={2}
                stroke="#000"
                onClick={changeColorCircle}
                draggable
              />

              <Star
                ref={rectRef}
                x={200}
                y={400}
                numPoints={6}
                innerRadius={40}
                outerRadius={70}
                shadowBlur={5}
                fill="green"
              />
        </Layer>
      </Stage>
    </div>
  )
}

export default Demo;