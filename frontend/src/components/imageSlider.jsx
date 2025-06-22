import { useState } from "react";

export default function ImageSlider(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = props.images;
  return (
    <div className="w-[500px] h-[600px]  ">
      <img
        className="w-full h-[500px] object-cover"
        src={images[currentIndex]}
        alt=""
      />
      <div className="w-full h-[100px] flex justify-center items-center    ">
        {images?.map((image, index) => {
          return (
            <img
              key={index}
              className={
                "w-[80px] h-[80px] rounded-2xl m-2 object-cover cursor-pointer hover:border-4 hover:border-accent " +
                (index == currentIndex && "border-4 border-accent")
              }
              onClick={() => {
                setCurrentIndex(index);
              }}    
              src={image}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}
