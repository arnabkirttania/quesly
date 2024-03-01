import React from "react";
import { Link } from 'react-router-dom';
import brand1 from '../Images/brand1.png'

function Navbar() {
  return (
    <>
    <div class = "container">
    <div class = "col">
      <nav class="navbar navbar-expand-lg navbar-light ">
  <Link class="navbar-brand" to="/"><img width="150px" src= {brand1} /></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/following">Following</Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Health & Fitness</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Business & Marketing</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Education</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Lifestyle</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Trending</a>
        </div>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/about">About</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/contact">Contact Us</Link>
      </li>
      
      {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <Link to = '/logout'><button class="btn btn-outline-success my-2 my-sm-0 mx-5" type="submit">Logout</button></Link>
    </form>
  </div>
 </nav>
 </div>
 </div>
    </>
  );
}

export default Navbar;
