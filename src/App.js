/** 
 *  @fileOverview This file is the home component.
 *
 *  @author       G M Mufeed
 *
 *  @requires     NPM:axios
 *  @requires     NPM:react
 *  @requires     NPM:react-bootstrap
 *  @requires     NPM:react-particles-js
 *  @requires     NPM:dotenv
 *  @requires     /components/Post.js:Posts
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Image } from "react-bootstrap";
import Posts from "./components/Posts";
import "bootstrap/dist/css/bootstrap.min.css";
import Particles from "react-particles-js";

require("dotenv").config();

export default function App() {
  const [posts, setPosts] = useState([]); // To set  the user value
  const [loading, setLoading] = useState(false); // Loader

  useEffect(() => {
    setLoading(true);
    //Get the user value from the mock API
    axios
      .get(process.env.REACT_APP_API_KEY)
      .then(function(response) {
        // handle success

        setPosts(response.data.members);
        setLoading(false);
        console.log(response.data.members);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, []);

  return (
    <div className="container mt-5">
      <Image
        src="https://lh6.googleusercontent.com/-WmRHrDWFrwI/AAAAAAAAAAI/AAAAAAAAAAA/iwZm6rdtUr0/s66-p-k-no-ns-nd/photo.jpg"
        fluid
      />
      <h1 className="text-primary mb-3 text-center">FullThrottle Labs</h1>
      <Posts posts={posts} loading={loading} />
      <Particles
        params={{
          particles: {
            line_linked: {
              shadow: {
                enable: true,
                color: "#000000",
                blur: 1
              }
            }
          }
        }}
      />
    </div>
  );
}
