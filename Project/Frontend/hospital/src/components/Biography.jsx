import React from "react";

const Biography = ({img}) => {
    return (
        <div className="container biography">
            <div className="banner">
                <img src={img} alt="Image"/>
            </div>
            <div className="banner">
                <p>Biography</p>
                <h1>Who we Are</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero beatae illum neque explicabo repellendus pariatur consequuntur fugiat laborum tempore, ullam porro nihil esse quae recusandae ut. Tenetur, praesentium doloremque explicabo corporis voluptatum impedit officiis a fugit accusantium facere libero eum.
                </p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, nihil.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, nisi.</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ducimus doloremque? Magnam deserunt molestias perspiciatis vitae rerum alias repellat voluptate?
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur in ex assumenda dolorem sapiente itaque at veniam officia id dolores.</p>
            </div>
        </div>
    )
}
export default Biography;