import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  // search input
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/users/${searchInput}/repos`);
  }
  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div className="h-screen bg-gray-100 pt-4">
      {/* search bar */}
      <div className="mx-4 h-12 flex items-center justify-between gap-2">
        {/* search input */}
        <div className="h-full flex-1 border border-gray-300 rounded-md flex items-center bg-white">
          <i className="m-2 fa-solid fa-sm fa-magnifying-glass text-gray-400" />
          <input className="h-full w-full rounded-md px-1"
            type="text"
            value={searchInput}
            placeholder="Search username"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyUp={(e) => (e.key === 'Enter' && searchInput !== "" && handleSearch(e))}
          />
        </div>
        {/* cancel button */}
        <div className="text-gray-400"
          onClick={handleCancel}
        >
          Cancel
        </div>
      </div>
    </div>
  )
}

export default Search