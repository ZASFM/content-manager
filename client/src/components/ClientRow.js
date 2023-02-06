import { FaTrashAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from './queries/ClientQueries';

const ClientRow = ({ client }) => {

   const {deleteClient}=useMutation(DELETE_CLIENT,{
      variables:{id:client.id},
      //refetching the browser:
      //refetchQueries:[{query:GET_CLIENTS}],
      //refecthing the browser with the update the cache:
      update(cache,{data:{deleteClient}}){
         const {clients}=cache.readQuery({
            query:GET_CLIENTS
         });
         cache.writeQuery({
            query:GET_CLIENTS,
            data:{clients:clients.filter(client=>client.id!==deleteClient.id)}
         });;
      }
   });

   return (
      <tr>
         <td>{client.name}</td>
         <td>{client.email}</td>
         <td>{client.phone}</td>
         <td>
            <button className="btn btn-danger btn-sm">
               <FaTrashAlt 
                  onClick={deleteClient}
               />
            </button>
         </td>
      </tr>
   )
}

export default ClientRow;