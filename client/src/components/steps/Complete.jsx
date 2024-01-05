import { Link } from "react-router-dom";



export default function completed() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="mt-3 text-xl font-semibold uppercase text-customColor">
          Thank You!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          We will work hard to curate the best articles for you! On the next page, you will be able to select your own AI writer to curate your newsletter.
        </div>
        <div className="my-3">
        <Link to="/Personalities">
          <button className="h-10 px-5 text-mustard transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-yellow-500 hover:text-yellow-100">
            Continue
          </button>
        </Link>
        </div>
      
      </div>
    </div>
  );
}