import React from 'react';
import { FaStar } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";

const ReviewCard: React.FC<any> = ({ review }) => {

    const ratingCounts: { [key: number]: number } = review.reduce((acc:any, { rating }:any) => {
        if (rating >= 1 && rating <= 5) {
            acc[rating] = (acc[rating] || 0) + 1;
        }
        return acc;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    const totalReviews = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0);

    const RatingProgress: React.FC<{ rating: number }> = ({ rating }) => (
        <div className="flex items-center ">
            <span className="font-medium text text-black mr-2">{rating}</span>
            <FaStar color='orange' className="mr-2 " />
            <div className="flex-grow">
                <ProgressBar 
                    completed={totalReviews ? (ratingCounts[rating] / totalReviews * 100) : 0} 
                    className=" " 
                    bgColor="orange" 
                    isLabelVisible={false} 
                />
            </div>
            <p className="font-medium text-lg text-black ml-2">{ratingCounts[rating]}</p>
        </div>
    );

    return (
        <div className="box flex flex-col gap-y-4">
            {[5, 4, 3, 2, 1].map(rating => (
                <RatingProgress key={rating} rating={rating} />
            ))}
        </div>
    );
};

export default ReviewCard;