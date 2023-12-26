import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="my-20 text-center flex flex-col gap-10">
      <Link to='/filltheform'>
        <button className=" hover:border-b border-b-4 border py-2 px-10 border-black rounded-lg font-bold ">
          Fill Up Form
        </button>
      </Link>
      <Link to='/lists'>
        <button className="hover:border-b border-b-4 border py-2 px-10 border-black rounded-lg font-bold">
          Collect The List
        </button>
      </Link>
    </div>
  );
};

export default Home;
