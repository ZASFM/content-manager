import { GET_PROJECTS } from "./queries/ProjectQueries";
import { useQuery } from "@apollo/client";
import Spinner from './Spinner';
import ProjectCard from "./ProjectCard";

const Projects = () => {
   const { data, loading, error } = useQuery(GET_PROJECTS);

   if (error) return <p>Something went wrong</p>
   if (loading) return <Spinner />

   return (
      <>
         {data.projects.length > 0 ? (<div className="row mt-3">
            {data.projects.map(project => (
               <ProjectCard
                  key={project.id}
                  project={project}
               />
            ))}
         </div>) : (<div>No projects so far</div>)}
      </>
   )
}

export default Projects;