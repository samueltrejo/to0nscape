import React, { useState } from 'react';
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Jumbotron
} from 'reactstrap';

import Navbar from './navbar';
// import HomeAbout from './home-about';
// import HomeGames from './home-games';
// import Footer from './footer';

import homeImage1 from '../images/home1.jpg';
import homeImage2 from '../images/home2.jpg';
import homeImage3 from '../images/home3.jpg';

const items = [
  {
    src: homeImage1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: homeImage2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: homeImage3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const Home = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = items.map((item) => {
    return (
      <CarouselItem className="w-100 h-75" onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src} >
        <img className="w-100 h-75" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  return (
    <div className="Home vh-100">
      <Navbar authed={props.authed} profile={props.profile} />
      <Carousel className="w-100 h-75" activeIndex={activeIndex} next={next} previous={previous} >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default Home;
