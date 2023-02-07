import AddClientModal from "../components/AddClientModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const Home = () => {
   return (
      <>
         <div className="d-flex gap3 mb-4">
            <AddClientModal />
         </div>
         <Projects />
         <hr />
         <Clients />
      </>
   )
}

export default Home;