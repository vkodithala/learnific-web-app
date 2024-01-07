import { Link } from "react-router-dom";



export default function completed() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col text-center gap-2">
        <div className="mt-3 text-3xl color-buttonColor font-bold">
          Thank You!
        </div>
        <div className="text-lg text-gray-500 justify-center">
          <span className="font-semibold">We will work hard to curate the best articles for you!</span> On the next page, you will be able to select your own AI writer to curate your newsletter.
        </div>
        <div className="my-3">
        <Link to="/Personalities">
          <button className="px-5 py-3 text-buttonColor transition-colors duration-500 border-2 border-buttonColor rounded-lg focus:shadow-outline hover:bg-yellow-500 hover:border-transparent hover:text-yellow-100">
            Continue
          </button>
        </Link>
        </div>
      
      </div>
    </div>
  );
}