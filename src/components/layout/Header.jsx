import { Link } from "react-router-dom"
import { useRepo } from "../../context/RepoContext";

function Header({ hideAll }) {
  const { loading, user } = useRepo();
  return (
    <div className="sticky top-0 w-full h-16 bg-dcard-bg-light">
      <div className="h-full mx-4 flex items-center justify-between">
        {/* Dcard logo svg */}
        <div className="flex-1 md:flex-none">
          <Link to="/">
            <img className="h-6 object-contain"
              src="https://www.dcard.tw/_next/static/media/logo.8b5bbef2.svg"
              alt="Dcard"
            />
          </Link>
        </div>

        {/* user name */}
        {user && 
          <div className="flex-1 text-center md:pr-16" hidden={hideAll || loading}>
            <span className="text-xl font-bold text-white">
              {user.login}
            </span>
          </div>
        }

        {/* Search button (for mobile) */}
        <div className="flex-1 text-right md:hidden" hidden={hideAll}>
          <Link to="/search">
            <i className="fa-solid fa-lg fa-magnifying-glass text-white" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Header