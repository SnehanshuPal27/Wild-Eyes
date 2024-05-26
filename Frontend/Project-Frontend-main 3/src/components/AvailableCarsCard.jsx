import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function AvailableCarsCard({ car }) {
  const navigate = useNavigate();
  
  return (
    <div className="car_card_css">
      <MDBCard className="carcard ">
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image flex justify-center hover-overlay"
        >
          <MDBCardImage
            className="img-car w-[325px] h-[250px]"
            src={car.image_url}
            fluid
            alt="..."
          />
          {/* <a>
            <div className="mask"></div>
          </a> */}
        </MDBRipple>
        <MDBCardBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MDBCardTitle style={{fontSize:"23px",fontWeight:"700"}}>{"~ " + car.species}</MDBCardTitle>
            <ul>
              {/* <li>{"Car No. - " + car.species}</li> */}
              <li>{"Description - " + car.descp}</li>
              <li>{"Location Recorded :" + car.latitude + ',' + car.longitude}</li>
              <li> <a href={car.link1}> {car.link1} </a> </li>
              <li> <a href={car.link2}> {car.link2} </a></li>
            </ul>      
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
