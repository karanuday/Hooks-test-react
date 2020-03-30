import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselItem (props) {
  return (
    <div className="img-grid">
      {props.items.map(item => (
        <img
          key={item.id}
          className=""
          src={require(`../${item.src}`)}
          alt={`Item ${item.id}`}
          height="180"
          width="140"
          style={{margin: '20px', 'border-radius': '5px', cursor: 'pointer'}}
          onClick={()=>props.onClick(item.id)}
        />
      ))}
    </div>
  )
}

function CustomCarousel (props) {
  let groupedItems = [];
  (function splitIntoFours () {
    // To group items into groups of 4 for carousel display
    let itemsCopy = [...props.items];
    while (itemsCopy.length) {
      groupedItems.push(itemsCopy.splice(0, 4));
    }
  })();
  
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} slide={false} interval={null}>
      {
        groupedItems.map((items, idx) => (
          <Carousel.Item key={idx}>
            <CarouselItem items={items} onClick={props.onClick}></CarouselItem>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default CustomCarousel;