// // import axios from "axios";
// // import React, { useState } from "react";
// // import { useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import NetflixResult from "./Result";



// // const ReviewForm = ({ onClose, onSubmit, movieName }) => {
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [correctopt , setcorrectOpt] = useState([]);
// //   const [showReviewTextArea, setShowReviewTextArea] = useState(false);
// //   const [review, setReview] = useState("");
// //   const [questions, setQuestions] = useState([]);
// //   const { id } = useParams();

  
// //   const fetchQuestions = async () => {
// //       try {
// //           const response = await axios.get(`http://localhost:5000/questions?name=${movieName}`);
// //           if (response.data) {
// //             console.log(response.data.questions);
// //              setQuestions(response.data.questions);
// //           }
// //       } catch (error) {
// //           console.error('Error fetching questions:', error);
// //       }
// //   };

// //     useEffect(() => {
// //         fetchQuestions();
// //         // console.log(encodeURIComponent(55));
// //     }, [id]);  // Dependency on the movie ID


// //   const handleChange = (questionId, answer) => {
// //     setAnswers({ ...answers, [questionId]: answer });
// //     setcorrectOpt([...correctopt, questions[currentQuestion].correct]);
// //   };

// //   const handleNextQuestion = () => {
// //     if (currentQuestion < questions.length - 1) {
// //       setCurrentQuestion(currentQuestion + 1);
// //     } else {
// //       setShowReviewTextArea(true);
// //     }
// //   };


// //   return (
  
// //     <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
// //       <div className="bg-white p-8 rounded-lg">
// //         <span
// //           className="absolute top-2 right-2 text-gray-600 cursor-pointer"
// //           onClick={onClose}
// //         >
// //           &times;
// //         </span>
// //         {showReviewTextArea ? (
// //           // <div className="mb-4">
// //           //   <textarea
// //           //     rows="5"
// //           //     className="w-full p-2 border border-gray-300 rounded text-black"
// //           //     placeholder="Write your review here..."
// //           //     value={review}
// //           //     onChange={(e) => setReview(e.target.value)}
// //           //   />
// //           //   <button
// //           //     type="button"
// //           //     className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
// //           //     onClick={handleSubmit}
// //           //   >
// //           //     Submit Review
// //           //   </button>
// //           // </div>
// //           <>
// //           {/* <NetflixResult userAns={answers} correct = {correctopt}/> */}
// //           </>
// //         ) : (
// //           <>
// //             <h2 className="text-2xl mb-4 text-black">
// //               {questions[currentQuestion]?.question}
// //             </h2>
// //             <form>
// //               {questions[currentQuestion]?.options.map((option, index) => (
                
// //                 <div key={index} className="mb-2">
// //                   <input
// //                     type="radio"
// //                     id={`option-${index}`}
// //                     name="options"
// //                     value={option}
// //                     onChange={() =>
// //                       handleChange(questions[currentQuestion].id, option)
// //                     }
// //                     className="mr-2"
// //                   />
// //                   <label className="text-black" htmlFor={`option-${index}`}>
// //                     {option}
                    
// //                   </label>
// //                 </div>
// //               ))}
// //             </form>
// //             <button
// //               type="button"
// //               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
// //               onClick={handleNextQuestion}
// //             >
// //               {currentQuestion < questions.length - 1
// //                 ? "Next Question"
// //                 : "Submit"}
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReviewForm;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import NetflixResult from "./Result";

// const ReviewForm = ({ onClose, onSubmit, movieName }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [correctOpt, setCorrectOpt] = useState([]);
//   const [showReviewTextArea, setShowReviewTextArea] = useState(false);
//   const [review, setReview] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/questions?name=${encodeURIComponent(movieName)}`);
//         if (response.data) {
//           setQuestions(response.data.questions)
//           setCorrectOpt(response.data.questions.map(q => q.correct_option));
//           // console.log(correctOpt);
//         }
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
    
//   }, [movieName]);

//   const handleChange = (questionId, answer) => {
//     setAnswers(prev => ({ ...prev, [questionId]: answer }));
//     console.log(`Question ${questionId} answered with: ${answer}`);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowReviewTextArea(true);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg">
//         <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
//         {showReviewTextArea ? (
//           <>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl mb-4 text-black">{questions[currentQuestion]?.question}</h2>
//             <form>
//               {questions[currentQuestion]?.options.map((option, index) => (
//                 <div key={index} className="mb-2">
//                   <input
//                     type="radio"
//                     id={`option-${index}`}
//                     name="options"
//                     value={option}
//                     checked={answers[questions[currentQuestion].id] === option}
//                     onChange={() => handleChange(questions[currentQuestion].id, option)}
//                     className="mr-2"
//                   />
//                   <label className="text-black" htmlFor={`option-${index}`}>
//                     {option}
//                   </label>
//                 </div>
//               ))}
//             </form>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
//                 onClick={handlePreviousQuestion}
//                 disabled={currentQuestion === 0}
//               >
//                 Previous Question
//               </button>
//               <button
//                 type="button"
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
//                 onClick={handleNextQuestion}
//               >
//                 {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;



// // --
// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // const ReviewForm = ({ onClose, onSubmit, movieName }) => {
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [correctOpt, setCorrectOpt] = useState([]);
// //   const [showReviewTextArea, setShowReviewTextArea] = useState(false);
// //   const [review, setReview] = useState("");
// //   const [questions, setQuestions] = useState([]);
// //   const { id } = useParams();
// //   const [timer, setTimer] = useState(null);

// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/questions?name=${encodeURIComponent(movieName)}`);
// //         if (response.data) {
// //           setQuestions(response.data.questions);
// //           setCorrectOpt(response.data.questions.map(q => q.correct_option));
// //         }
// //       } catch (error) {
// //         console.error('Error fetching questions:', error);
// //       }
// //     };

// //     fetchQuestions();
// //   }, [id, movieName]);

// //   useEffect(() => {
// //     // Start a timer when the component mounts or the current question changes
// //     if (!showReviewTextArea) {
// //       startTimer();
// //     }

// //     return () => {
// //       // Clean up the timer when the component unmounts or the question changes
// //       if (timer) {
// //         clearTimeout(timer);
// //       }
// //     };
// //   }, [currentQuestion, showReviewTextArea]);

// //   const startTimer = () => {
// //     const timeout = setTimeout(() => {
// //       handleNextQuestion();
// //     }, 500000); // 5 seconds timer
// //     setTimer(timeout);
// //   };

// //   const handleChange = (questionId, answer) => {
// //     setAnswers(prev => ({ ...prev, [questionId]: answer }));
// //     console.log(`Question ${questionId} answered with: ${answer}`);
// //     // Reset timer on user interaction
// //     if (timer) {
// //       clearTimeout(timer);
// //     }
// //     startTimer();
// //   };

// //   const handleNextQuestion = () => {
// //     if (currentQuestion < questions.length - 1) {
// //       setCurrentQuestion(currentQuestion + 1);
// //     } else {
// //       setShowReviewTextArea(true);
// //       if (timer) {
// //         clearTimeout(timer);
// //       }
// //     }
// //   };

// //   const handlePreviousQuestion = () => {
// //     if (currentQuestion > 0) {
// //       setCurrentQuestion(currentQuestion - 1);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
// //       <div className="bg-white p-8 rounded-lg">
// //         <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
// //         {showReviewTextArea ? (
// //           <>
// //           </>
// //         ) : (
// //           <>
// //             <h2 className="text-2xl mb-4 text-black">{questions[currentQuestion]?.question}</h2>
// //             <form>
// //               {questions[currentQuestion]?.options.map((option, index) => (
// //                 <div key={index} className="mb-2">
// //                   <input
// //                     type="radio"
// //                     id={`option-${index}`}
// //                     name="options"
// //                     value={option}
// //                     checked={answers[questions[currentQuestion].id] === option}
// //                     onChange={() => handleChange(questions[currentQuestion].id, option)}
// //                     className="mr-2"
// //                   />
// //                   <label className="text-black" htmlFor={`option-${index}`}>
// //                     {option}
// //                   </label>
// //                 </div>
// //               ))}
// //             </form>
// //             <div className="flex justify-between">
// //               <button
// //                 type="button"
// //                 className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
// //                 onClick={handlePreviousQuestion}
// //                 disabled={currentQuestion === 0}
// //               >
// //                 Previous Question
// //               </button>
// //               <button
// //                 type="button"
// //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
// //                 onClick={handleNextQuestion}
// //               >
// //                 {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReviewForm;








//     // const handleSubmit = async () => {
//     //   try {
//     //     const token = localStorage.getItem("token"); // token in localStorage
//     //     const headers = {
//     //       Authorization: `Bearer ${token}`,
//     //     };
  
//     //     const response = await axios.post(
//     //       "http://localhost:7676/api/auth/addReview",
//     //       { review, movie_id: id },
//     //       { headers, withCredentials: true }
//     //     );
//     //     console.log(response.data); // Check the response from the backend
//     //     const data = await response.json();
//     //     if (response.ok) {
//     //       onSubmit(data.review);
//     //       onClose();
//     //     } else {
//     //       throw new Error(data.message);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error adding review:", error.message);
//     //   }
//     // };
