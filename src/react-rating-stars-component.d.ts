declare module 'react-rating-stars-component' {
    import { ComponentType } from 'react';
  
    interface ReactStarsProps {
      count?: number;
      value?: number;
      onChange?: (newRating: number) => void;
      size?: number;
      color?: string;
      activeColor?: string;
      edit?: boolean;
      isHalf?: boolean;
      emptyIcon?: JSX.Element;
      halfIcon?: JSX.Element;
      filledIcon?: JSX.Element;
    }
  
    const ReactStars: ComponentType<ReactStarsProps>;
  
    export default ReactStars;
  }
  