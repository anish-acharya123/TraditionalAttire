import React from "react";
import Wishlist from "../Wishlist/Wishlist";

const Likeditems = () => {
  const likeditem = true;
  return (
    <div>
      <h1 className="text-[32px] underline">Liked Items</h1>
      <Wishlist likeditem={likeditem} />
    </div>
  );
};

export default Likeditems;
