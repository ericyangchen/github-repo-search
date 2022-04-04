
function ErrorCard({ msg, status }) {
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center rounded-md border-2 border-red-500 max-w-lg">
      <span className="text-xl text-black font-bold">{status}</span>
      <span className="text-lg text-red-500">User not found</span>
    </div>
  )
}

export default ErrorCard