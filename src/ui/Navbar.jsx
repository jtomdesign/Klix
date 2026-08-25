import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { HiFilm } from "react-icons/hi";
import { HiCog } from "react-icons/hi";
import { HiVideoCamera } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../features/Auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="bg-blueTom-900 flex w-25 shrink-0 flex-col items-center justify-between text-white">
      <Link to={"/"}>
        <img src="/logo-light.png" alt="" className="m-2 w-14 p-2" />
      </Link>
      <div className="center flex flex-col items-center gap-12">
        <Link to={"/"}>
          <HiHome className="text-blueTom-50 cursor-pointer text-3xl transition hover:text-sky-300" />
        </Link>
        <Link to={"/movies"}>
          <HiFilm className="text-blueTom-50 text-3xl transition hover:text-sky-300" />
        </Link>
        <Link to={"/tvshows"}>
          <HiVideoCamera className="text-blueTom-50 text-3xl transition hover:text-sky-300" />
        </Link>
        <Link to={"/bookmark"}>
          <HiBookmark className="text-blueTom-50 text-3xl transition hover:text-sky-300" />
        </Link>
      </div>
      <div className="center flex flex-col items-center justify-end gap-6 pb-7">
        {user && (
          <>
            <Link to={"/settings"}>
              <div className="bg-blueTom-800 h-10 w-10 overflow-hidden rounded-full p-2">
                <img className="w-full" src={user.image} alt="" />
              </div>
              <p className="my-2 text-[0.7rem] font-bold text-blue-50">
                Hi, {user.firstName}
              </p>
            </Link>

            <div className="cursor-pointer" onClick={() => dispatch(logout())}>
              <HiOutlineLogout className="text-blueTom-50 text-3xl transition hover:text-sky-300" />
            </div>
          </>
        )}
        {/* <Link to={"/settings"}>
          <HiCog className="text-blueTom-50 text-3xl transition hover:text-sky-300" />
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
