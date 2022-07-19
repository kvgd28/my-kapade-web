import React from "react";
import { NavLink } from "react-router-dom";

function BookingStatus(props) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
      />
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-lg-5 col-sm-10 mx-auto d-flex justify-content-center order-1">
            {props.isSuccess === "true" ? (
              <>
                <div>
                  <h1 className="pt-3 mx-auto d-flex justify-content-center ">
                    Booking successful
                  </h1>
                  <i
                    className="bi bi-emoji-heart-eyes pt-5  mx-auto d-flex justify-content-center "
                    style={{ "font-size": "5rem", color: "lightseagreen" }}
                  ></i>
                  <div className="pt-5  mx-auto d-flex justify-content-center ">
                    <NavLink to="/" className="btn-get-started">
                      Go Home
                    </NavLink>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="pt-3  mx-auto d-flex justify-content-center ">
                    Booking failed due to an error, Please try again
                  </h2>
                  <i
                    className="bi bi-emoji-neutral-fill pt-5  mx-auto d-flex justify-content-center "
                    style={{ "font-size": "5rem", color: "coral" }}
                  ></i>
                  <div className="pt-5  mx-auto d-flex justify-content-center ">
                    <NavLink to="/book" className="btn-get-started">
                      Try again
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingStatus;
