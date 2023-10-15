import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

const SavedShows = () => {
  const { user } = UserAuth();
  const [Movies, setMovies] = useState([]); // Initialize as an empty array
  const [hovered, setHovered] = useState(false);

  const movieRef = doc(db,'users',`${user?.email}`)

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const deleteShow =  async (passedID) => {
    try {
        const results = Movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef,{
            savedShows:results
        })
    } catch (error) {
        console.log(error);
    }
  }

  console.log(Movies.length+"❤️❤️❤️");
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows || []); // Use an empty array if SavedShows is null
    });
  }, [user?.email]); // Add user?.email as a dependency

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div
        className="relative flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hovered && (
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10"
            size={40}
          />
        )}
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {Movies.length > 0 ? (
            Movies.map((item,id) => (
              <div  key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center font-bold text-center items-center h-full">
                    {item?.title}
                  </p>
                  <p onClick={()=> deleteShow(item.id)} className="absolute top-4 right-4 text-gray-300"><AiOutlineClose /> </p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {hovered && (
          <MdChevronRight
            onClick={slideRight}
            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10"
            size={40}
          />
        )}
      </div>
    </>
  );
};

export default SavedShows;
