import { languageColor } from '../../constants/languageColor';

function RepoCard({ repo }) {
  return (
    <div className="rounded p-4 flex flex-col gap-2">
      {/* name */}
      <div className="flex gap-2 items-center">
        <span>
          <i className="fa-solid fa-laptop-code text-gray-400" />
        </span>
        <span className="flex-1 text-dcard-bg-light font-bold text-lg">
          {repo?.name}
        </span>

        {repo?.private === false && <span className="justiy-self-end px-2 text-gray-700 rounded-xl text-xs border border-gray-300">Public</span>
        }
      </div>

      {/* description */}
      <div className="text-sm text-gray-700 ">
        {repo?.description}
      </div>

      {/* additional info */}
      <div className="flex gap-6 items-center text-xs text-gray-700">
        {/* language */}
        {repo.language &&
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 inline-block rounded-full"
              style={{ backgroundColor: languageColor[repo?.language] }}
            />
            <span>{repo?.language}</span>
          </div>
        }
        {/* fork */}
        <div className="flex items-center gap-1">
          <span>
            <i className="fa-solid fa-code-fork"></i>
          </span>
          <span>{repo?.forks_count}</span>
        </div>
        {/* stargazer */}
        <div className="flex items-center gap-1">
          <span>
            <i className="fa-regular fa-star"></i>
          </span>
          <span>{repo?.stargazers_count}</span>
        </div>
        {/* issue */}
        <div className="flex items-center gap-1">
          <span>
            <i className="fa-regular fa-circle-dot"></i>
          </span>
          <span>{repo?.open_issues_count}</span>
        </div>
      </div>
    </div >
  )
}

export default RepoCard