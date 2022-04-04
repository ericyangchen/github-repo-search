
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useRepo } from "../../context/RepoContext";

function RepoDetail() {
  const { username, repo } = useParams();

  const { repos, fetchRepoDetail } = useRepo();

  const [data, setData] = useState();
  useEffect(() => {
    const detail = repos.find(element => element.name === repo);
    if (detail) {
      setData(detail);
    } else {
      fetchRepoDetail(username, repo);
    }
  }, [repo, repos, fetchRepoDetail, username])
  
  return (
    <>
      <Layout>
        {data &&
          <div className="bg-gray-100 border-b border-gray-300">
            {/* name info description */}
            <div className="max-w-7xl mx-auto p-4">
              <div className="flex flex-col gap-2">
                {/* name */}
                <div className="flex gap-2 items-center">
                  <span>
                    <i className="fa-solid fa-laptop-code text-gray-400" />
                  </span>
                  <span className="text-lg text-dcard-bg-light">
                    <span>{data?.owner.login}</span>
                    <span className="mx-1">/</span>
                    <span className="font-bold">{data?.name}</span>
                  </span>
                  {data?.private === false &&
                    <span className="justiy-self-end px-2 text-gray-700 rounded-xl text-xs border border-gray-300">
                      Public
                    </span>
                  }
                </div>
                {/* sm: description */}
                <div className="md:hidden my-4 text-gray-700">
                  {data?.description}
                </div>
                {/* sm: link */}
                <a className="md:hidden" href={data?.html_url} target="_blank" rel="noreferrer noopener">
                  <div className="text-sm flex items-center gap-1">
                    <i className="fa-solid fa-link fa-sm"></i>
                    <span className="font-medium text-dcard-bg-light break-all">
                      {data?.html_url}
                    </span>
                  </div>
                </a>
                {/* sm: star & forks */}
                <div className="md:hidden flex mt-2 gap-6 items-center text-sm text-gray-700">
                  {/* stargazer */}
                  <div className="flex items-center gap-1">
                    <span>
                      <i className="fa-regular fa-star fa-fw"></i>
                    </span>
                    <span className="font-bold">{data?.stargazers_count}</span>
                    {data?.stargazers_count > 1 ? 
                      <span>stars</span>
                      :
                      <span>star</span>
                    }
                  </div>
                  {/* fork */}
                  <div className="flex items-center gap-1">
                    <span>
                      <i className="fa-solid fa-code-fork fa-fw"></i>
                    </span>
                    <span className="font-bold">{data?.forks_count}</span>
                    {data?.forks_count > 1 ? 
                      <span>forks</span>
                      :
                      <span>fork</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* content files and md: about */}
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-3">
          {data?.content && data?.content.length > 0 ?
            // files > 0
            <div className="p-4 md:col-span-2">
              <div className="mb-4">
                <span className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 text-gray-500">
                  <span className="mr-1">
                    <i className="fa-solid fa-code fa-fw"></i>
                  </span>
                  <span className="font-bold">Code</span>
                </span>
                
              </div>
              {/* list */}
              <ul className="flex flex-col divide-y divide-gray-200 border border-gray-300 rounded-md bg-white ">
                <li className="flex px-4 py-3 justify-end bg-gray-100 rounded-t-md">
                  <span className="text-semibold text-gray-500">
                    Last updated at {new Date(data.updated_at).toDateString()}
                  </span>
                </li>
                {data.content.map((item, index) => {
                  return (
                    <li className="flex px-4 py-2"
                      key={index}
                    >
                      {item?.type === "dir" ?
                        <span className="mr-2 text-sky-400">
                          <i className="fa-solid fa-folder fa-fw"></i>
                        </span>
                          :
                        <span className="mr-2 text-gray-400">
                          <i className="fa-regular fa-file fa-fw"></i>
                        </span>
                      }
                      <a href={item.html_url} target="_blank" rel="noreferrer noopener">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

            </div>
            :
            // files = 0
            <div className="px-4 w-full mt-8 flex flex-col justify-center items-center md:col-span-3">
              <span className="text-lg text-gray-400 font-semibold">
                The user has not created any files yet...
              </span>
            </div>
          }
          {/* md: about */}
          <div className="hidden md:flex col-span-1 md:py-4 md:flex-col md:gap-4">
            <span className="text-xl font-bold">About</span>
            <span className="text-base">{data?.description}</span>
            <a className="" href={data?.html_url} target="_blank" rel="noreferrer noopener">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-link"></i>
                <span className="font-medium text-dcard-bg-light break-all">
                  {data?.html_url}
                </span>
              </div>
            </a>
            {/* stargazer */}
            <div className="flex items-center gap-1">
              <span>
                <i className="fa-regular fa-star fa-fw"></i>
              </span>
              <span className="font-bold">{data?.stargazers_count}</span>
              {data?.stargazers_count > 1 ? 
                <span>stars</span>
                :
                <span>star</span>
              }
            </div>
            {/* fork */}
            <div className="flex items-center gap-1">
              <span>
                <i className="fa-solid fa-code-fork fa-fw"></i>
              </span>
              <span className="font-bold">{data?.forks_count}</span>
              {data?.forks_count > 1 ? 
                <span>forks</span>
                :
                <span>fork</span>
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default RepoDetail