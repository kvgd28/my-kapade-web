import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Slideshow() {
  const slideImages = [
    {
      caption: "First Picture",
      url:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=200"
    },
    {
      caption: "Second Picture",
      url:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=200"
    },
    {
      caption: "Third Picture",
      url:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=200"
    }
  ];

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /*
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://booking-service-kdewilj24a-uc.a.run.app/getallitemgroups")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  */

  return (
    <div className="slide-container">
      <Slide duration="2000" transitionDuration="1000">
        {items.map((item, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Slideshow;
