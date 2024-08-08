import React from 'react';
import { Button } from 'react-bootstrap';

interface OutlinedButtonProps {
  text: string; 
  onclick: () => void; 
  color?: string; 
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ text, onclick, color }) => {
  const handleClick = () => {
    onclick();
  };

  return (
    <div>
      <Button
        size="sm"
        onClick={handleClick}
        style={{ color }} 
        variant="outline" 
        className="flex items-center gap-3"
      >
        {text}
      </Button>
    </div>
  );
};

export default OutlinedButton;
