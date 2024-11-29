import { NavLink } from "react-router-dom";
import { LogoImage } from "../../../assets/assetManger";
import Image from "../Image";
import SearchBar from "../search/SearchBar";
import { IoHome } from "react-icons/io5";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { SingleLink } from "./SingleLink";

const AppNavbar = () => {
  return (
    <nav className=" w-full sticky top-0 z-[50] bg-white h-[4rem] border-b flex shadow-md justify-between items-center px-[4rem] ">
      {/* Logo Part */}
      <NavLink to={"/"} className="flex items-center w-fit">
        <Image src={LogoImage} alt="Logo" className=" w-[12rem] h-full " />
      </NavLink>

      <div className=" w-[30rem] ">
        <SearchBar />
      </div>

      <div className=" flex gap-[.5rem] items-center  ">
        <SingleLink label="Home" icon={<IoHome />} path="/" />
        <SingleLink
          label="Stats"
          icon={<BiSolidBarChartAlt2 />}
          path="/stats"
        />
      </div>
    </nav>
  );
};

export default AppNavbar;
