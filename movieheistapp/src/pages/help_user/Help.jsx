import React from 'react';
import { Card, Collapse, Button } from 'antd';
import AppHeader from '../../components/AppHeader';
// import 'antd/dist/antd.css'; // Import Ant Design styles

const { Panel } = Collapse;

const Help = () => {
  return (
    <>
      <AppHeader />
      <div className="max-w-4xl mx-auto p-4 bg-black">
        <Card bordered={false} className="mt-5 bg-gray-800 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <Collapse accordion defaultActiveKey={['1']} ghost className="text-white">
            <Panel header="How to Log In" key="1" className="text-white">
              <p className="text-white">
                To log in, click on the 'Login' button at the top right corner. Enter your email and password and click 'Submit'.
              </p>
              <Button type="danger" className="mt-2 transition-colors duration-300 ease-linear hover:bg-red-800">
                Learn More
              </Button>
            </Panel>
            <Panel header="How to Sign Up" key="2" className="text-white">
              <p className="text-white">
                To sign up, click on the 'Sign Up' button. Fill in the registration form with your details and submit.
              </p>
              <Button type="danger" className="mt-2 transition-colors duration-300 ease-linear hover:bg-red-800">
                Learn More
              </Button>
            </Panel>
            <Panel header="How to Reset Your Password" key="3" className="text-white">
              <p className="text-white">
                If you've forgotten your password, click on 'Forgot Password?' at the login page. Follow the instructions to reset your password.
              </p>
              <Button type="danger" className="mt-2 transition-colors duration-300 ease-linear hover:bg-red-800">
                Learn More
              </Button>
            </Panel>
          </Collapse>
        </Card>
      </div>
    </>
  );
};

export default Help;
