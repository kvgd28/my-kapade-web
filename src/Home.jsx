import React from "react";
import { NavLink } from "react-router-dom";
import Slideshow from "./SlideShow";

function Home() {
  return (
    <>
      <section id="header" className="">
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-11 mx-auto">
              <div className="row">
                <div className="col-sm-6 pt-5 pt-lg-0 order-2 order-lg-1">
                  <h1>
                    Grow your business with{" "}
                    <strong className="brand-name">Kapade</strong>
                  </h1>
                  <h2 className="my-3">We are the team of logistics</h2>
                  <div className="mt-3">
                    <NavLink to="/book" className="btn-get-started">
                      Book slot for FREE
                    </NavLink>
                  </div>
                </div>

                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <Slideshow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
