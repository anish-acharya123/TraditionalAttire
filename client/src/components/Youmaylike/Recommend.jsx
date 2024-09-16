// cimport React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper/modules";

// const Recommend = () => {
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const response = await axios.get("http://localhost:2000/recommend", {
//           withCredentials: true,
//         });
//         console.log("Recommendations fetched:", response.data); // Debugging line
//         setRecommendations(response.data);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       }
//     };

//     fetchRecommendations();
//   }, []);

//   const addToCart = (item) => {
//     console.log("Adding to cart:", item);
//   };

//   const LikeItem = (id) => {
//     console.log("Liked item with id:", id);
//   };

//   if (!recommendations.length) {
//     return <p>No recommendations available.</p>; // Debugging line
//   }

//   return (
//     <section className="flex justify-center items-center">
//       <div className="overflow-hidden relative max-w-[1440px] px-8 w-full flex flex-col gap-12 sm:py-24 flex-1">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-4 gap-2">
//           <h1 className="text-[20px] md:text-[32px] font-bold min-w-fit text-[#ec8d9c]">
//             YOU MAY LIKE THIS
//           </h1>
//           <div className="h-1 bg-gray-300 w-full" />
//         </div>

//         <Swiper
//           slidesPerView={4}
//           spaceBetween={30}
//           pagination={{ clickable: true }}
//           navigation
//           modules={[Pagination, Navigation]}
//           className="mySwiper"
//         >
//           {recommendations.slice(0, 5).map((item) => (
//             <SwiperSlide
//               key={item._id}
//               className="p-2 leading-[130%] mb-8 text-center rounded-lg bg-white grid gap-2 place-content-center place-items-center shadow-md"
//             >
//               <figure className="h-[9rem] w-[9rem] md:w-[13rem] p-2 md:h-[13rem] relative overflow-hidden">
//                 <Link to={`/product/productid/${item._id}`}>
//                   <img
//                     alt={item.type}
//                     src={item.images[1] || "/default-image.jpg"} // Fallback image
//                     className="h-full w-full hover:scale-105 transition-all"
//                   />
//                 </Link>
//               </figure>
//               <div>
//                 <h2 className="text-[15px] sm:text-[16px] md:text-[18px] text-center">
//                   {item.type}
//                 </h2>
//                 <p>Rs: {item.price.S || item.price.M || item.price.L}</p>
//               </div>
//               <div className="flex">
//                 {[...Array(4)].map((_, i) => (
//                   <Icon
//                     key={i}
//                     icon="material-symbols-light:star-rate"
//                     className="text-yellow-300 h-8 w-8"
//                   />
//                 ))}
//                 <Icon
//                   icon="material-symbols-light:star-rate-outline"
//                   className="text-yellow-300 h-8 w-8"
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => addToCart(item)}
//                   className="bg-[#ec8d9c] hover:bg-white hover:text-[#ed7c8d] transition-all border-2 border-[#ec8d9c] text-white p-1 py-2 sm:w-[5rem] text-[12px] rounded"
//                 >
//                   Add To cart
//                 </button>
//                 <button
//                   onClick={() => LikeItem(item._id)}
//                   className="border-2 px-2 py-2 rounded text-[14px]"
//                 >
//                   WishList
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default Recommend;
