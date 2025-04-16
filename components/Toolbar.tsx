import React, { useState } from 'react';
import './Toolbar.css';

// 工具类型枚举
export enum ToolType {
  SELECT = 'select',
  MOVE = 'move',
  BRUSH = 'brush',
  TEXT = 'text',
  NONE = 'none'
}

interface ToolbarProps {
  onToolChange: (tool: ToolType) => void;
  onUndo: () => void;
  onDownload: () => void;
  onClear: () => void;
  onSave: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onToolChange,
  onUndo,
  onDownload,
  onClear,
  onSave
}) => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.BRUSH);

  const handleToolClick = (tool: ToolType) => {
    setActiveTool(tool);
    onToolChange(tool);
  };

  return (
    <div className="toolbar">
      <button 
        className={`tool-button ${activeTool === ToolType.SELECT ? 'active' : ''}`}
        onClick={() => handleToolClick(ToolType.SELECT)}
        title="选择工具"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V17H17V3H3ZM16 16H4V4H16V16Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
          <path d="M7 12L4 16H8L7 12Z" fill="currentColor"/>
        </svg>
      </button>

      <button 
        className={`tool-button ${activeTool === ToolType.MOVE ? 'active' : ''}`}
        onClick={() => handleToolClick(ToolType.MOVE)}
        title="移动工具"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 6L18 10L14 14" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 6L2 10L6 14" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 14L10 2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 18L10 14" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <button 
        className={`tool-button ${activeTool === ToolType.BRUSH ? 'active' : ''}`}
        onClick={() => handleToolClick(ToolType.BRUSH)}
        title="绘画工具"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 3.5C15.3284 2.67157 16.6716 2.67157 17.5 3.5C18.3284 4.32843 18.3284 5.67157 17.5 6.5L7 17L3 18L4 14L14.5 3.5Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <button 
        className={`tool-button ${activeTool === ToolType.TEXT ? 'active' : ''}`}
        onClick={() => handleToolClick(ToolType.TEXT)}
        title="文本工具"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5H15" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 5V16" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 16H13" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <div className="divider"></div>

      <button 
        className="tool-button"
        onClick={onUndo}
        title="撤销"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7L3 10L7 13" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10H13C15.2091 10 17 11.7909 17 14V14" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <button 
        className="tool-button"
        onClick={onDownload}
        title="下载"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3V13" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 9L10 13L14 9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 16H16" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <button 
        className="tool-button"
        onClick={onClear}
        title="清除"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      <button 
        className="save-button"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default Toolbar; 
