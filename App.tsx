import React, { useState, useRef } from 'react';
import { Toolbar, ToolType, ImagePainting } from './components';

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(ToolType.BRUSH);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleToolChange = (tool: ToolType) => {
    setCurrentTool(tool);
    // 在这里实现工具切换的逻辑
  };

  const handleUndo = () => {
    // 实现撤销功能
  };

  const handleDownload = () => {
    // 实现下载功能
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'image-painting.png';
      a.click();
    }
  };

  const handleClear = () => {
    // 实现清除功能
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleSave = () => {
    // 实现保存功能
    handleDownload();
  };

  return (
    <div className="app">
      <Toolbar 
        onToolChange={handleToolChange} 
        onUndo={handleUndo}
        onDownload={handleDownload}
        onClear={handleClear}
        onSave={handleSave}
      />
      <ImagePainting 
        currentTool={currentTool}
        canvasRef={canvasRef}
        imageRef={imageRef}
      />
    </div>
  );
};

export default App; 
