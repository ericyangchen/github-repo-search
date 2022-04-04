import { useState, useEffect } from "react"

function ErrorCard({ msg, status }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    switch (status) {
      case 301:
        setMessage("Error: Moved permanently")
        break;
      case 404:
        setMessage("Error: Not found");
        break;
      case 403:
        setMessage("Error: Forbidden");
        break;
      default:
        setMessage("Error: Unknowned Error");
        break;
    }
  }, [status]);
  
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center rounded-md border-2 border-red-500 max-w-lg">
      <span className="text-xl text-black font-bold">{status}</span>
      <span className="text-lg text-red-500">{message}</span>
    </div>
  )
}

export default ErrorCard