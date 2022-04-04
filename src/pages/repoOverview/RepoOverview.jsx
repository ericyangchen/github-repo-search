import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader";
  
import Layout from "../../components/layout/Layout";
import Backdrop from "../../components/utility/Backdrop";
import { useRepo } from "../../context/RepoContext";
import RepoCard from "./RepoCard";

function RepoOverview() {
  const { username } = useParams();
  const {
    user,
    repo_list,
    sort_by,
    fetchRepoList,
    loading,
    loadingList,
    has_more_repo,
    loadMoreList,
    // toggleLoading,
  } = useRepo();

  // sort options
  const [sortBy, setSortBy] = useState(sort_by || "name");
  const selectSort = (key) => {
    setSortBy(key);
    console.log(key);
    setHideBackdrop(true);
  }
  // backdrop
  const [hideBackdrop, setHideBackdrop] = useState(true);
  const clickSort = () => {
    setHideBackdrop(false);
  }

  // watch for changes
  useEffect(() => {
    fetchRepoList(username, sortBy)
  }, [username, sortBy, fetchRepoList])

  // infinite scroll
  const observer = useRef();
  const lastRepoElementRef = useCallback(node => {
    if (loading || loadingList) return;

    // disconnect current observer
    if (observer.current) {
      observer.current.disconnect();
    }
    // create new observer to observe last repo element
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && has_more_repo) {
        loadMoreList();
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, loadingList, has_more_repo, loadMoreList]);


  return (
    <>
      <Layout>
        {/* user info */}
        {user && 
          <div className="py-8 bg-gray-100 border-gray-300">
            <div className="px-4 flex gap-4 max-w-7xl mx-auto">
              <img className="rounded-md h-24 object-contain border border-gray-300"
                src={user?.avatar_url} alt={username}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold text-black">
                  {user?.name}
                </span>
                <a href={user?.html_url} target="_blank" rel="noreferrer noopener">
                  <div className="text-sm flex items-center gap-1">
                    <i className="fa-solid fa-link fa-sm"></i>
                    <span>
                      {user?.html_url}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        }

        {/* repo list */}
        {repo_list && repo_list.length > 0 ?
          // repo > 0
          <div className="px-4 pb-4 max-w-7xl mx-auto">
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
            <ul className="flex flex-col divide-y divide-gray-300 border border-gray-300 rounded-md bg-white 
              md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:border-0 lg:grid-cols-3 xl:grid-cols-4 ">
              {repo_list.map((repo, index) => {
                if (repo_list.length === index + 1) {
                  return (
                    <li key={index} ref={lastRepoElementRef}>
                      <RepoCard repo={repo} />
                    </li>
                  )
                } else {
                  return (
                    <li key={index}>
                      <RepoCard repo={repo} />
                    </li>
                  )
                }
              })}
            </ul>
            {/* loading spinner */}
            <div className="my-8 w-full text-center" hidden={!loadingList}>
              <SyncLoader color="#006AA6" loading={loadingList} />
            </div>
          </div>
          :
          // repo = 0
          <div className="px-4 max-w-7xl mx-auto w-full mt-8 flex flex-col justify-center items-center">
            <span className="text-lg text-gray-400 font-semibold">
              The user has not created any repositories yet...
            </span>
          </div>
        }
        
        {/* Backdrop & sort options */}
        <Backdrop hideBackdrop={hideBackdrop} setHideBackdrop={setHideBackdrop} />
        <div className="absolute w-full top-1/3 left-0 right-0 z-20 max-w-md mx-auto"
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
              {/* <li className="p-4" key={"stars"} onClick={() => selectSort("stars")}>
                <span  className={sortBy === "stars" ? "visible" : "invisible"}>
                  <i className="fa-solid fa-check"></i>
                </span>
                <span className="ml-2">Stars</span>
              </li> */}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default RepoOverview