
function Backdrop({ hideBackdrop, setHideBackdrop, children }) {
  return (
    <div className="h-screen w-full z-10 bg-gray-800 opacity-60 absolute top-0 left-0"
      onClick={() => setHideBackdrop(true)}
      hidden={hideBackdrop}
    >
    </div>
  )
}

export default Backdrop