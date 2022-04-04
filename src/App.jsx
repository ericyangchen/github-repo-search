import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { RepoProvider } from './context/RepoContext';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import RepoOverview from './pages/repoOverview/RepoOverview';
import RepoDetail from './pages/repoDetail/RepoDetail';

function App() {
  return (
    <>
      <RepoProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/users/:username/repos' element={<RepoOverview />} />
            <Route path='/users/:username/repos/:repo' element={<RepoDetail />} />
            <Route path='*' element={<Navigate to="/" replace/>} />
          </Routes>
        </Router>
      </RepoProvider>
    </>
  );
}

export default App;
