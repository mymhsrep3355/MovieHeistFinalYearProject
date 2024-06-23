import React from "react";
import { Layout } from "antd";
import {
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";


const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="bg-black text-red-600 py-20">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-10 mb-4">
          <li>
            <a className="text-white hover:text-gray-400" href="#">
              Terms Of Use
            </a>
          </li>
          <li>
            <a className="text-white hover:text-gray-400" href="#">
              Privacy-Policy
            </a>
          </li>
          <li>
            <a
            href="#"
              className="text-white hover:text-gray-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="text-white hover:text-gray-400"
              href="#"
            >
              Blog
            </a>
          </li>
          <li>
            <a className="text-white hover:text-gray-400" href="#">
              FAQ
            </a>
          </li>
        </ul>
        <div className="text-center mb-4">
          Created By MovieHeist Team.
        </div>
        <div className="text-center text-white mb-4">
          Ayesha Waheed || Muhammad Hamza || Maryam Saeed
        </div>
        <div className="flex justify-center space-x-4">
          <a
            className="text-white hover:text-gray-400"
            href="#"
          >
            <GithubOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#"
          >
            <GitlabOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#"
          >
            <InstagramOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#"
          >
            <TwitterOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#"
          >
            <LinkedinOutlined style={{ fontSize: "24px" }} />
          </a>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
