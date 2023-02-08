import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FaList } from "react-icons/fa"
import { GET_PROJECTS } from "./queries/ProjectQueries"
import { GET_CLIENTS } from "./queries/ClientQueries"
import { ADD_PROJECT } from "../mutations/projectMutation"

const AddProjectModal = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [clientId, setClientId] = useState('');
   const [status, setStatus] = useState('new');

   const { error, loading, data } = useQuery(GET_CLIENTS);

   const [addProject]=useMutation(ADD_PROJECT,{
      variables:{name,description,status,clientId},
      update(cache,{data:{addProject}}){
         const{projects}=cache.readQuery({query:GET_PROJECTS});
         cache.writeQuery({
            query:GET_PROJECTS,
            data:{projects:[...projects, addProject]}
         })
      }
   })

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!name || !description || !status || !clientId) return;

      addProject(name,description,status,clientId);

      setName('');
      setDescription('');
      setStatus('new');
      setClientId('');
   }

   if (loading) return null;
   if (error) return <div>Something went wrong...</div>

   return (
      <>
         {!loading && !error && (
            <>
               <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">
                  <div className="d-flex align-items-center">
                     <FaList className="icon" />
                     <div>Add project</div>
                  </div>
               </button>

               <div className="modal fade" id="projectModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h1 className="modal-title fs-5" id="exampleModalLabel">Add project:</h1>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                 <label className="form-label">Name</label>
                                 <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                              </div>

                              <div className="mb-3">
                                 <label className="form-label">Description</label>
                                 <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                              </div>

                              <div className="mb-3">
                                 <label className="form-label">Status</label>
                                 <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="new">Not started</option>
                                    <option value="progress">In progress</option>
                                    <option value="completed">Completed</option>
                                 </select>
                              </div>

                              <div className="mb-3">
                                 <label className="form-label">Client</label>
                                 <select
                                    id="clientId"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    className="form-select"
                                 >
                                    <option>Assign client</option>
                                    {data.clients.map(client => (
                                       <option value={client.id} key={client.id} >{client.name}</option>
                                    ))}
                                 </select>
                              </div>

                              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                 Submit
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )}

      </>
   )
}

export default AddProjectModal;