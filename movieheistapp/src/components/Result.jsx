import React from 'react';
import { Result, Button } from 'antd';

const NetflixResult = () => {

  return (
    <div className="  flex justify-center items-center">
      <Result
        status="success"
        title={<span className="text-white text-3xl">Successfully Watched!</span>}
        subTitle={<span className="text-gray-400">You have finished watching Breaking Bad.</span>}
        extra={[
         
        
          <Button key="retake" className="bg-gray-700 text-white border-gray-600 hover:bg-gray-800 mt-2">
            Retake Quiz
          </Button>,
          <Button key="addReview" className="bg-red-600 border-red-600 hover:bg-red-700 text-white mt-2">
            Add Review
          </Button>
        ]}
        className="bg-gray-800 p-8 rounded-lg"
      />
    </div>
  )
}

export default NetflixResult;
