
function Backdrop({ hideBackdrop, setHideBackdrop, children }) {
  return (
    <div className="h-screen absolute w-full z-10 bg-gray-800 opacity-60 top-0 left-0"
      onClick={() => setHideBackdrop(true)}
      hidden={hideBackdrop}
    >
    </div>
  )
}

export default Backdrop