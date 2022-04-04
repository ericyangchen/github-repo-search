import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRepo } from '../../context/RepoContext';
import Layout from "../layout/Layout";
import ErrorCard from "./ErrorCard";


function Error() {
  const { error, clearError } = useRepo();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
        navigate("/", { replace: true });
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError, navigate]);


  return (
    <Layout hideAll={true}>
      <div className="h-screen flex flex-col items-center p-4 gap-4">
        {error && Object.keys(error).map((key, index) => {
          return (<ErrorCard key={key} msg={key} status={error[key]} />)
        })}
      </div>
    </Layout>
  )
}

export default Error