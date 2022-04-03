import { useRepo } from '../../context/RepoContext';
// import Footer from './Footer';
import Header from './Header';

function Layout({ children, hideAll }) {
  const { loading } = useRepo();
  return (
    <div className='h-screen overflow-y-auto md:bg-dcard-bg-dark'>
      {/* header */}
      <Header hideAll={hideAll || false} />

      {/* display loading indicator */}

      {/* main component */}
      <div className="mb-8" hidden={loading}>
        {children}
      </div>

      {/* footer */}
      {/* <Footer hideAll={loading || hideAll || false} /> */}
    </div>
  )
}

export default Layout