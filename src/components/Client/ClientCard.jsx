import { Link } from "react-router-dom";
import user from "../../assets/Ellipse 693.png"
const ClientCard = ({client}) => { 
console.log(client);
    const {id,name,email,country}=client;
      
    return (
        <Link to={`/client/${id}`}> {/* Wrap the card in a Link that takes you to the dynamic route */}
        <div className="flex gap-3 items-center p-4 border rounded-lg shadow-sm hover:bg-gray-50 font-title">
          <div>
            <img src={user} alt="Client Avatar" className="w-[60px] h-[60px] rounded-full" />
          </div>
          <div>
            <p className="text-black font-semibold">{name}</p>
            <p className="text-gray-500">{country}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
      </Link>
    );
};

export default ClientCard;