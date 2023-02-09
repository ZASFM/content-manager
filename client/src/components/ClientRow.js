import { FaTrashAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from './queries/ClientQueries';
import { GET_PROJECTS } from './queries/ProjectQueries';

const ClientRow = ({ client }) => {

   const { delete_Client } = useMutation(DELETE_CLIENT, {
      variables: { id: client.id },
      //refetching the browser with the clients and projects since im touching both on deleteClient:
      refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
      //updating my all clients array to no to be the one that i have deleted, and reloading:
      /* update(cache, { data: { delete_Client } }) {
         const { clients } = cache.readQuery({
            query: GET_CLIENTS
         });
         cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: clients.filter(client => client.id !== delete_Client.id) }
         });
      } */
   });

   return (
      <tr>
         <td>{client.name}</td>
         <td>{client.email}</td>
         <td>{client.phone}</td>
         <td>
            <button className="btn btn-danger btn-sm">
               <FaTrashAlt
                  onClick={delete_Client}
               />
            </button>
         </td>
      </tr>
   )
}

export default ClientRow;