import React from "react";
import logo from "../assets/Movieheist.png";
import { useNavigate } from "react-router-dom";
const AppHeader = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div>
      <img className=" object-cover ml-5 size-24" src={logo} alt="" />
      </div>
      <div className="flex justify-between items-center mr-9">
        <div className="flex">
          <button
            className=" capitalize pr-4 bg-red-600 px-5 py-2 rounded-lg"
            onClick={() => {
              navigate(props.login ? "/login" : "/signup");
            }}
          >
            {props.login ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

// import React from "react";
// import styled from "styled-components";
// import logo from "../assets/Movieheist.png";
// import { useNavigate } from "react-router-dom";
// export default function AppHeader(props) {
//   const navigate = useNavigate();
//   return (
//     <ContainerHeader>
//       <div className="HeaderContainer flex justify-between align-center">
//         <div className="logo">
//           <img src={logo} alt="Movie Heist logo" />
//         </div>
//         <div className="btn_signUp">
//           <button
//             onClick={() => {
//               navigate(props.login ? "/login" : "/signup");
//             }}
//           >
//             {props.login ? "Log In" : "Sign Up"}
//           </button>
//         </div>
//       </div>
//     </ContainerHeader>
//   );
// }

// const ContainerHeader = styled.div`
//   padding: 0 5rem;
//   .logo {
//     margin-top: 25px;
//     img {
//       height: 8rem;
//       width: 10rem;
//     }
//   }
//   .btn_signUp {
//     margin-top: 25px;
//   }
//   button {
//     padding: 1rem 1rem;
//     width: 7rem;
//     background-color: red;
//     color: white;
//     border: none;
//     cursor: pointer;
//     font-size: 17;
//     border-radius: 7px
//   }
// `;
