import { Link, useNavigate, useParams } from "react-router-dom"
import { useRepo } from "../../context/RepoContext";

function Header({ hideAll }) {
  const { loading, user, error, clearError } = useRepo();
  const { repo } = useParams();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (error) {
      clearError();
    }
    navigate("/");
  }
  return (
    <div className="fixed top-0 w-full h-14 bg-dcard-bg-light">
      <div className="h-full mx-4 flex items-center justify-between max-w-7xl xl:mx-auto xl:px-4">
        {/* goback icon */}
        <div className="flex-1 cursor-pointer md:w-16"
          hidden={hideAll || !repo}
        >
          <i className="fa-solid fa-chevron-left fa-lg text-white"
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Dcard logo svg */}
        <div className="flex-1 cursor-pointer" hidden={repo}>
            <img className="h-6 object-contain"
              src="https://www.dcard.tw/_next/static/media/logo.8b5bbef2.svg"
              alt="Dcard"
              onClick={handleLogoClick}
            />
        </div>

        {/* user name */}
        {user && !error &&
          <div className="flex-1 text-center" hidden={hideAll || loading}>
            <span className="text-xl font-bold text-white">
              {user.login}
            </span>
          </div>
        }

        {/* Search button (for mobile) */}
        <div className="flex-1 text-right cursor-pointer" hidden={hideAll}>
          <Link to="/search">
            <i className="fa-solid fa-lg fa-magnifying-glass text-white" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Header