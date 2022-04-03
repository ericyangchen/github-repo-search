

function Portfolio() {
  return (
    <div className="w-full bg-white font-semibold text-center rounded-3xl border shadow-lg p-8 max-w-xs mx-auto">
      <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src="./profile-picture.jpeg" alt="Eric Chen" />
      <h1 className="text-lg text-gray-700"> Eric Chen </h1>
      <h3 className="text-sm text-gray-400 "> CS Student </h3>
      <p className="text-xs text-gray-400 mt-4">  </p>
      <button className="bg-orange-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Hire Me</button>
    </div>
  )
}

export default Portfolio