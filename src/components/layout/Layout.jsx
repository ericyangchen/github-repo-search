import BeatLoader from "react-spinners/BeatLoader";
import { useRepo } from '../../context/RepoContext';

import Header from './Header';
// import Footer from './Footer';


function Layout({ children, hideAll }) {
  const { loading } = useRepo();
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