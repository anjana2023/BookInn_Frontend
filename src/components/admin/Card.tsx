import React, { ReactNode } from "react"
interface CardProps {
    title: string
    total: string
    children: ReactNode
  }
  
  const Card: React.FC<CardProps> = ({
    title,
    total,
    children,
  }) => {
    return (
      <div className="rounded-2xl border border-stroke  items-center justify-center bg-white py-6 px-1  pr-6shadow-default dark:border-strokedark dark:bg-boxdark ">
       
  
        <div className="mt-4 flex items-end justify-center">
          <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
            <span className="text-lg font-medium">{title}</span>
            <h4 className="text-title-md font-bold text-black dark:text-white text-center">
              {total}
            </h4>
          </div>
        </div>
      </div>
    )
  }
  
  export default Card