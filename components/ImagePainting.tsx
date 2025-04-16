import React, { useRef, useEffect, useState } from 'react';
import { ToolType } from './Toolbar';
import './ImagePainting.css';

interface ImagePaintingProps {
  currentTool: ToolType;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  imageRef?: React.RefObject<HTMLImageElement>;
}

export const ImagePainting: React.FC<ImagePaintingProps> = ({ 
  currentTool,
  canvasRef: externalCanvasRef,
  imageRef: externalImageRef
}) => {
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const internalImageRef = useRef<HTMLImageElement>(null);
  
  // 使用提供的ref或内部ref
  const canvasRef = externalCanvasRef || internalCanvasRef;
  const imageRef = externalImageRef || internalImageRef;
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 初始化画布尺寸
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // 初始化画布样式
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
  }, []);
  
  // 处理图片加载
  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 调整画布尺寸以适应图片
    canvas.width = image.width;
    canvas.height = image.height;
    
    // 绘制图片到画布
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  
  // 开始绘画
  const startDrawing = (e: React.MouseEvent) => {
    if (currentTool !== ToolType.BRUSH) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };
  
  // 绘画中
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || currentTool !== ToolType.BRUSH) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
  };
  
  // 结束绘画
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  // 加载图片
  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') return;
      
      if (imageRef.current) {
        imageRef.current.src = event.target.result;
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="image-painting-container">
      <input 
        type="file" 
        accept="image/*" 
        onChange={loadImage} 
        className="image-input"
      />
      
      <div className="canvas-container">
        <img 
          ref={imageRef} 
          style={{ display: 'none' }} 
          onLoad={handleImageLoad} 
          alt="Uploaded" 
        />
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="drawing-canvas"
        />
      </div>
    </div>
  );
};

export default ImagePainting; 
