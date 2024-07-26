import React from 'react'

const ProgressBar:React.FC= ({ percentage }:any) => {
    return (
        <div className="box flex items-center justify-between gap-x-2 w-full border-solid border border-gray-300 rounded-lg p-2 md:pl-5 md:pr-10 md:w-full lg:pr-20 lg:w-full lg:h-11 xl:w-full xl:pl-3 xl:pr-5 xl:h-11">
            <div className="box h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 mr-3">
                <span className="h-full w-[{percentage}%] rounded-3xl bg-amber-400 flex"></span>
            </div>
            <p className="font-medium text-lg text-black mr-0.5">{percentage}%</p>
        </div>
    );
};

export default ProgressBar;