import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Rate, message } from "antd";
import { GoVerified } from "react-icons/go";
import { MdSentimentSatisfiedAlt, MdOutlineSentimentDissatisfied } from "react-icons/md";


const MovieReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      //   if (!token) {
      //     message.error("You must be logged in to see reviews");
      //     return;
      //   }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `http://localhost:7676/api/auth/reviews/${id}`
        );
        // , {
        //   headers,
        //   withCredentials: true
        // });

        if (response.status === 200) {
          setReviews(response.data);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      } catch (error) {
        message.error(error.message || "Error fetching reviews");
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="bg-black min-h-screen p-5">
      <div className="grid md:grid-cols-1 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card
              key={review._id}
              title={<h3 className="text-white text-xl">{review.review}</h3>}
              bordered={false}
              className="bg-gray-800 text-white"
              headStyle={{ borderColor: "#f00", color: "#fff" }}
              bodyStyle={{ borderColor: "#333" }}
            >
              <p className="flex gap-5">
                Review sentiment: {review.sentiment}
                {review.sentiment === "positive && recommended" ? (
                  <MdSentimentSatisfiedAlt size={24} className="text-green-500" />
                ) : (
                  <MdOutlineSentimentDissatisfied size={24} className="text-red-500" />
                )}
              </p>
              {/* <p>Review sentiment: {review.sentiment}</p> */}
              <Rate allowHalf defaultValue={review.score} disabled />
              <div className="flex justify-start items-center">

              <p className=" text-lg ">Authenticity Score: {review.score} / 5</p>
              </div>
              {review.userId && (
                <div className="flex justify-start items-center gap-3">
                  <p className="text-sm text-gray-400">
                    Reviewer: {review.userId.email}
                  </p>
                  <GoVerified color="green" size={20} />
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card
            bordered={false}
            className="bg-gray-800 text-white"
            headStyle={{ borderColor: "#f00", color: "#fff" }}
            bodyStyle={{ borderColor: "#333" }}
          >
            <p className="text-white">No reviews available</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
