import React from "react";
//import GoogleLogin from "@leecheuk/react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    //console.log("Google Response:", response);

    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }

    function handleCredentialResponse(response) {
      //console.log(response)

      //console.log(JSON.stringify(parseJwt(response.credential)));
    }

    //console.log(handleCredentialResponse(response));

    //localStorage.setItem("user", JSON.stringify(response.profileObj));
    localStorage.setItem("user", JSON.stringify(parseJwt(response.credential)));

    //const { name, googleId, imageUrl } = JSON.stringify(parseJwt(response.credential));//response.profileObj;

    const infoProfile = parseJwt(response.credential);
    //console.log(JSON.stringify(infoProfile));
    const name = infoProfile.name;
    const googleId = infoProfile.sub;
    const imageUrl = infoProfile.picture;

    //console.log(googleId);
    //console.log(name);
    //console.log(imageUrl);

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              //clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              //useOneTap
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
