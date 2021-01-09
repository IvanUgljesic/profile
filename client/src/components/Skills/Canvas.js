import React, { useRef, useEffect } from 'react';

const Canvas = props => {
  const canvasRef = useRef(null);

  const width = props.width;

  const params = {...props}
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    context.fillStyle = props.color
    context.fillRect(0, 0, width, props.height)
  }, [props, width])
  
  return <canvas ref={canvasRef} {...params}/>
}

export default Canvas