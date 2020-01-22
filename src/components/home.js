import React from 'react';
import { Jumbotron } from 'reactstrap';

import Navbar from './navbar';
// import HomeAbout from './home-about';
// import HomeGames from './home-games';
// import Footer from './footer';

// import homeImage1 from '../images/home1.jpg';
// import homeImage2 from '../images/home2.jpg';
// import homeImage3 from '../images/home3.jpg';

class Home extends React.Component {
  render() {
    const { authed, profile } = this.props;
    return (
      <div className="Home">
        <Navbar authed={authed} profile={profile} />
        {/* <Jumbotron className="h-75 rounded-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${instrumentsImg})`,
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <div className="container text-light mt-5">
            <h1 className="display-4 text-center">Welcome to Chordcraft!</h1>
            <p className="lead mx-5">A tool and creative playground to help you do what you do best. This tool is a top-notch editor for creating song chords and lyrics. Click the button below to get started.</p>
            <hr className="bg-light my-2 w-75" />
            <p className="lead text-center">
              <Button className="bg-transparent text-light" color="light">Getting Started</Button>
            </p>
          </div>
        </Jumbotron> */}
        {/* <HomeAbout /> */}
        {/* <HomeGames /> */}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Home;
