import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../components/queries/ProjectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";

const Project = () => {
   const { id } = useParams();
   const { loading, error, data } = useQuery(GET_PROJECT, {
      variables: { id }
   });

   if (error) return <div>Something went wrong</div>
   if (loading) return <Spinner />
   return (
      <>
         {!error && !loading && (
            <div className="mx-auto w-75 card p-5">
               <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                  Back
               </Link>

               <h1>{data.project.name}</h1>
               <p>{data.project.description}</p>

               <h5 className="mt-3">Project status:</h5>
               <p className="lead">{data.project.status}</p>

               <ClientInfo client={data.project.client} />

               <DeleteProjectButton projectId={id} />
            </div>
         )}
      </>
   )
}

export default Project;