import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImageZoom = ({ image }) => {
  return (
    <div className="product-image">
      <Zoom>
        <img
          src={image}
          alt="Product"
          className="h-full w-full"// Set the initial image size
        />
      </Zoom>
    </div>
  );
};

export default ProductImageZoom;
