import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/layout/Layout';

function Home() {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  // const { fetchRepoList } = useRepo();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    navigate(`/users/${searchInput}/repos`);
  }

  return (
    <Layout hideAll={true}>
      <div className="container p-4">
        {/* Intro */}
        <div className="py-4 flex flex-col justify-center items-center gap-4 bg-white rounded text-black text-3xl font-bold"
        >
          <span>2022</span>
          <span>
            Dcard
          </span>
          <span>
            Web Frontend Intern
          </span>
          <span>
            Homework
          </span>
        </div>
        {/* search bar */}
        <div className="mt-8 w-full h-12 rounded-md bg-white flex items-center border border-gray-300">
          <span className="pl-4 r-2 text-black"
            onClick={e => handleSearch(e)}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </span>
          <input className="px-2 w-full h-full rounded-md focus:outline-none bg-white text-black"
            type="text"
            value={searchInput}
            placeholder="Search Github Users"
            onChange={e => setSearchInput(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Home