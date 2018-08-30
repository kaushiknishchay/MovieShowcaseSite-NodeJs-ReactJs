import React from 'react';
import map from 'lodash/map';
import range from 'lodash/range';
import { Carousel } from 'react-responsive-carousel';


const MovieCarousel = () => {
  return (
    <Carousel
      autoPlay
      showThumbs={false}
      showStatus={false}
      interval={2000}
      infiniteLoop
      dynamicHeight
    >
      {
        map(range(5), k => (
          <div key={`${k}_banner`}>
            <img
              alt={`${k}_image`}
              src={`https://picsum.photos/800/400/?random&${k}`}
              style={{
                width: '100%',
              }}
            />
            <p className="legend">
              {'Legend '}
              {k}
            </p>
          </div>
        ))
      }
    </Carousel>
  );
};

export default MovieCarousel;
