import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Layout from "../../components/layout/Layout";
import Backdrop from "../../components/utility/Backdrop";
import { useRepo } from "../../context/RepoContext";
import RepoCard from "./RepoCard";

function RepoOverview() {
  const { username } = useParams();
  const { user, repo_list, sort_by, fetchFirstRepoList, fetchNextRepoList } = useRepo();

  // sort
  const [sortBy, setSortBy] = useState("name");
  const selectSort = (key) => {
    setSortBy(key);
    setHideBackdrop(true);
  }

  // watch for changes (username, sortBy)
  useEffect(() => {
    // check state.user === username
    if (user && (username).toLowerCase() === (user.login).toLowerCase()) {
      // if (sortBy === sort_by) {
        return;
      // }
      // else {
      //   fetchFirstRepoList(username, 1, sortBy);
      // }
    }
    // new user: make initial api call
    fetchFirstRepoList(username, 1, sortBy);
  }, [fetchFirstRepoList, username, user, sortBy]);



  // backdrop
  const [hideBackdrop, setHideBackdrop] = useState(true);
  const clickSort = () => {
    setHideBackdrop(false);
  }



  return (
    <>
      <Layout>
        {/* user info */}
        {user && 
          <div className="px-4 py-8 bg-gray-100 flex gap-4">
            <img className="rounded-md h-24 object-contain"
              src={user?.avatar_url} alt={username}
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-dcard-bg-light">
                @{user?.login}
              </span>
              <span className="text-sm">
                {user?.name}
              </span>
            </div>
          </div>
        }

        {/* repo list */}
        {repo_list && repo_list.length > 0 ?
          // repo > 0
          <div className="px-4">
            {/* sorting option tabs */}
            <div className="my-2 w-full flex items-center justify-between">
              <div className="my-2 text-sm text-gray-500">
                {repo_list.length === 1 ? "Repository" : "Repositories"}
              </div>
              <button className="flex justify-center items-center px-3 bg-gray-100 border border-gray-300 rounded-3xl"
                onClick={clickSort}
              >
                <span className="text-gray-500 mr-1">
                  Sort
                </span>
                <span className="text-gray-500">
                  <i className="fa-solid fa-caret-down" />
                </span>
              </button>
            </div>
            {/* list */}
            <ul className="flex flex-col divide-y divide-gray-300 border border-gray-300 rounded-md bg-white md:bg-gray-100">
              {repo_list.map((repo, index) => {
                return (
                  <li key={index}>
                    <RepoCard repo={repo} />
                  </li>
                )
              })}
            </ul>
          </div>
          :
          // repo = 0
          <div className="w-full mt-8 flex flex-col justify-center items-center">
            <span className="text-xl text-gray-400 font-bold">
              The user has not created any repositories yet...
            </span>
          </div>
        }

        {/* Backdrop & sort options */}
        <Backdrop hideBackdrop={hideBackdrop} setHideBackdrop={setHideBackdrop} />
        <div className="absolute w-full top-1/3 left-0 z-20"
          hidden={hideBackdrop}
        >
          <div className="mx-4 bg-neutral-700 rounded-md opacity-100 border border-neutral-400 text-gray-100 text-sm font-semibold">
            {/* select order */}
            <div className="p-4 w-full border-b border-neutral-500 flex justify-between">
              <span>Select Order</span>
              <span onClick={() => setHideBackdrop(true)}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
            {/* sort options */}
            <ul className="flex flex-col justify-center divide-y divide-neutral-500">
              <li className="p-4" key={"last-updated"} onClick={() => selectSort("last-updated")}>
                <span className={sortBy === "last-updated" ? "visible" : "invisible"}>
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="ml-2">Last Updated</span>
              </li>
              <li className="p-4" key={"name"} onClick={() => selectSort("name")}>
                <span className={sortBy === "name" ? "visible" : "invisible"}>
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="ml-2">Name</span>
              </li>
              <li className="p-4" key={"stars"} onClick={() => selectSort("stars")}>
                <span  className={sortBy === "stars" ? "visible" : "invisible"}>
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="ml-2">Stars</span>
              </li>
            </ul>
          </div>
        </div>        

      </Layout>
    </>
  )
}

export default RepoOverview