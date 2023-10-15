import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Movie from "./Movie";
import { MdChevronRight, MdChevronLeft } from "react-icons/md"; // Import MD icons

const Row = ({ title, fetchURL,RowId }) => {
  const [Movies, setMovies] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const handleMouseEnter = () => {
    // Show icons on hover
    setHovered(true);
  };

  const handleMouseLeave = () => {
    // Hide icons on mouse leave
    setHovered(false);
  };

  const [hovered, setHovered] = useState(false); // State for hover
  const slideLeft = () => {
    let slider = document.getElementById('slider' + RowId)
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const slideRight = () => {
    let slider = document.getElementById('slider' + RowId)
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div
        className="relative flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hovered && <MdChevronLeft onClick={slideLeft} className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10" size={40} />}
        <div
          id={"slider" + RowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {Movies.length > 0 ? (
            Movies.map((item, id) => <Movie key={id} item={item} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {hovered && <MdChevronRight onClick={slideRight} className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10" size={40} />}
      </div>
    </>
  );
};

export default Row;
