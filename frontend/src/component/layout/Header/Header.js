import React,{useState} from "react";
import { link } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "./Header.css";
import UserOptions from "./UserOptions";
//import store from "../../../store";
import { useSelector } from "react-redux";


// const options = {
//   burgerColorHover= "#eb4034"
//   logo
//   logoWidth= "20vmax"
//   navColor1= "white"
//   logoHoverSize= "10px"
//   logoHoverColor= "#eb4034"
//   link1Text= "Home"
//   link2Text= "Products"
//   link3Text= "Contact"
//   link4Text= "About"
//   link1Url= "/"
//   link2Url= "/products"
//   link3Url= "/contact"
//   link4Url= "/about"
//   link1Size= "1.3vmax"
//   link1Color= "rgba(35 35 350.8)"
//   nav1justifyContent= "flex-end"
//   nav2justifyContent= "flex-end"
//   nav3justifyContent= "flex-start"
//   nav4justifyContent= "flex-start"
//   link1ColorHover= "#eb4034"
//   link1Margin= "1vmax"
//   profileIconUrl= "/login"
//   profileIconColor= "rgba(35 35 350.8)"
//   searchIconColor= "rgba(35 35 350.8)"
//   cartIconColor= "rgba(35 35 350.8)"
//   profileIconColorHover= "#eb4034"
//   searchIconColorHover= "#eb4034"
//   cartIconColorHover= "#eb4034"
//   cartIconMargin= "1vmax"
// };

// const Header = () => {
//   return (<ReactNavbar {...options} />);
// };

// const Header = () => {
//   return (
//     <ReactNavbar
//     burgerColorHover= "#eb4034"
//     logo={logo}
//     logoWidth= "20vmax"
//     navColor1= "white"
//     logoHoverSize= "10px"
//     logoHoverColor= "#eb4034"
//     link1Text= "Home"
//     link2Text= "Products"
//     link3Text= "Contact"
//     link4Text= "About"
//     link1Url= "/"
//     link2Url= "/products"
//     link3Url= "/contact"
//     link4Url= "/about"
//     link1Size= "1.3vmax"
//     link1Color= "rgba(35 35 350.8)"
//     nav1justifyContent= "flex-end"
//     nav2justifyContent= "flex-end"
//     nav3justifyContent= "flex-start"
//     nav4justifyContent= "flex-start"
//     link1ColorHover= "#eb4034"
//     link1Margin= "1vmax"
//     profileIconUrl= "/login"
//     profileIconColor= "rgba(35 35 350.8)"
//     searchIconColor= "rgba(35 35 350.8)"
//     cartIconColor= "rgba(35 35 350.8)"
//     profileIconColorHover= "#eb4034"
//     searchIconColorHover= "#eb4034"
//     cartIconColorHover= "#eb4034"
//     cartIconMargin= "1vmax"
//     />
//   ) 
// }

const Header = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [navbar, setNavbar] = useState(false)
  
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }
  window.addEventListener("scroll", changeBackground)

  return (
  <>
      <nav className={navbar ? 'main-nav active' : 'main-nav'}>
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>E C</span>ommerce
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products?keyword=${keyword}">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>



        {/* 3rd social media links */}
        <div className="social-media">
         <ul className="social-media-desktop">
            <li>
              <NavLink to="/search"><BsSearch className="search" fontSize={22}/></NavLink>
            </li>
            <li>
              <NavLink to="/login"><BsFillFilePersonFill className="login" fontSize={22}/></NavLink>
            </li>
            <li>
              <NavLink to="/cart"><AiOutlineShoppingCart className="cart" fontSize={22}/></NavLink>
            </li>
            {/* {isAuthenticated && <UserOptions user={user} /> } */}

            {/* <li>
              <a
                href="https://www.instagram.com/thapatechnical/"
                target="_thapa">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_thapa">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li> */}
        </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu style={{color:"rgba(255,180,150,0.8)"}}/>
            </a>
          </div>
        </div> 
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  )
}


export default Header;