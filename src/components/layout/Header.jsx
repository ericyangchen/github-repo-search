import { Link, useNavigate, useParams } from "react-router-dom"
import { useRepo } from "../../context/RepoContext";

function Header({ hideAll }) {
  const { loading, user } = useRepo();
  const { repo } = useParams();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 w-full h-14 bg-dcard-bg-light">
      <div className="h-full mx-4 flex items-center justify-between max-w-7xl xl:mx-auto xl:px-4">
        {/* goback icon */}
        <div className="flex-1 md:flex-none cursor-pointer md:w-16"
          hidden={hideAll || !repo}
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-chevron-left fa-lg text-white"></i>
        </div>
        {/* Dcard logo svg */}
        <div className="flex-1 md:flex-none cursor-pointer" hidden={repo}>
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
        <div className="flex-1 text-right md:hidden cursor-pointer" hidden={hideAll}>
          <Link to="/search">
            <i className="fa-solid fa-lg fa-magnifying-glass text-white" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Header