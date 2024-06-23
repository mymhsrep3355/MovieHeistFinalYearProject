import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, message, Modal, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loader from '../components/Loaders/Loader.jsx';
import { Link } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

const { confirm } = Modal;
const { Title, Paragraph } = Typography;

const TMDB_API_KEY = 'b93a64480573ce5248c28b200d79d029';
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noReviewsModalVisible, setNoReviewsModalVisible] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You must be logged in to view reviews");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:7676/api/auth/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const reviewsWithMovies = await Promise.all(response.data.map(async review => {
          const movieResponse = await axios.get(`${TMDB_API_URL}/${review.movieId}?api_key=${TMDB_API_KEY}`);
          return { ...review, movieTitle: movieResponse.data.title, moviePoster: movieResponse.data.poster_path };
        }));
        setReviews(reviewsWithMovies);
        if (reviewsWithMovies.length === 0) {
          setNoReviewsModalVisible(true);
        }
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      message.error(error.message || 'Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (reviewId) => {
    confirm({
      title: 'Are you sure you want to delete this review?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okButtonProps: {
        style: { backgroundColor: 'blue', borderColor: 'blue' },
        className: 'hover:bg-red-600',
      },
      cancelButtonProps: {
        style: { backgroundColor: 'gray', borderColor: 'gray' },
        className: 'hover:bg-red-600',
      },
      async onOk() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(`http://localhost:7676/api/auth/review/${reviewId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          if (response.status === 200) {
            message.success('Review deleted successfully');
            fetchReviews(); // Refresh the list after deletion
          } else {
            throw new Error('Failed to delete review');
          }
        } catch (error) {
          message.error(error.message || 'Error deleting review');
        }
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-5 flex flex-col items-center bg-gradient-to-r from-red-900 to-black">
      <Link
        to="/movies"
        className="fixed z-10 top-5 left-5 text-4xl text-white bg-red-600 rounded-full p-2"
      >
        <HiChevronLeft />
      </Link>
      <Title level={2} style={{ color: 'White' }} className='mb-5 font-bold'>User Reviews</Title>
      {reviews.length > 0 ? reviews.map((item) => (
        <Card
          key={item._id}
          className="w-full max-w-xl bg-white text-white mb-4 hover:bg-white transition-colors duration-300 shadow-lg"
          actions={[
            <Button key="delete" type="primary" danger onClick={() => handleDelete(item._id)} icon={<ExclamationCircleOutlined />}>
              Delete
            </Button>
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img alt={item.movieTitle} src={`https://image.tmdb.org/t/p/w500${item.moviePoster}`} className="w-full h-auto rounded" />
            </Col>
            <Col span={16}>
              <Card.Meta
                title={<Title level={6} className="text-red-600">{`${item.movieTitle}`}</Title>}
                description={
                  <>
                    <Paragraph>{item.review}</Paragraph>
                    <Paragraph strong className="text-red-600">Sentiment: {item.sentiment}</Paragraph>
                    <Paragraph>Score: <span className="text-red-900">{item.score}</span> / 5</Paragraph>
                  </>
                }
              />
            </Col>
          </Row>
        </Card>
      )) : (
        <Modal
          visible={noReviewsModalVisible}
          footer={null}
          onCancel={() => setNoReviewsModalVisible(false)}
          className="text-white bg-yellow-900 rounded-md p-4"
        >
          <Title level={3} style={{ color: 'red' }}>No Reviews Found</Title>
          <Paragraph>Please check back later or add some reviews.</Paragraph>
        </Modal>
      )}
    </div>
  );
};


export default Reviews;
