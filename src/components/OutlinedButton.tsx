import React from "react"
import { Button } from "react-bootstrap"

const OutlinedButton = ({ text, onclick, color }) => {
  const handleClick = () => {
    onclick()
  }
  return (
    <div>
      <Button
        size="sm"
      onClick={handleClick}
        color={color}
        variant="outlined"
        className="flex items-center gap-3"
      >
        {text}
      </Button>
    </div>
  )
}

export default OutlinedButton
