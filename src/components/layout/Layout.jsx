import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useRepo } from '../../context/RepoContext';

import Header from './Header';
// import Footer from './Footer';


function Layout({ children, hideAll }) {
  const { loading, error } = useRepo();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("/error", {replace: true});
    }
  }, [error, navigate]);
  
  
  return (
    <div className='h-screen'>
      {/* header */}
      <Header hideAll={hideAll || false} />

      {loading ? 
        <div className="mt-14 h-5/6 flex items-center justify-center">
          {/* display loading indicator */}
          <BeatLoader color="#006AA6" loading={loading} />
        </div>
        :
        <div className="mt-14">
          {/* main component */}
          {children}
        </div>
      }

      {/* footer */}
      {/* <Footer hideAll={loading || hideAll || false} /> */}
    </div>
  )
}

export default Layout