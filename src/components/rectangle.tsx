import { useState } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva'

const Demo = () => {
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

  const changeColorRect = () => {
    setRectColor('red')
  }

  const changeColorCircle = () => {
    setCircleColor('#343434')
  }

  return (
      <Stage width={200} height={200} style={{background: '#ccc'}}>
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
      </Layer>
    </Stage>
  )
}

export default Demo;