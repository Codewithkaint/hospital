import React from "react";

const Hero = ({ title, img }) => {
    return (
        <div className="hero container">
            <div className="banner">
                <h1>{title}</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam aliquam tempore autem pariatur vero ipsa minus quae deserunt quis molestias earum cupiditate, sint possimus hic ab totam fugiat non cum ducimus quisquam odio ratione rem? Quibusdam voluptates eligendi aliquid.
                </p>
            </div>
            <div className="banner">
                <img src={img} alt="Image" className="animated-image" />
                <span>
                    <img src="/Vector.png" alt="Vector" />
                </span>
            </div>
        </div>
    )
}
export default Hero;