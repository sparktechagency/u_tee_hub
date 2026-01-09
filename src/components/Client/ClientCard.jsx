import { Link } from "react-router-dom";

const ClientCard = ({ client }) => {
  console.log(client?.profile?.id?.image);
  const { _id, email } = client;

  return (
    <Link to={`/client/${_id}`}>
      <div
        className="
        flex 
        gap-2 
        sm:gap-3 
        md:gap-4 
        items-center 
        p-2 
        sm:p-3 
        md:p-4 
        border 
        rounded-lg 
        shadow-sm 
        hover:bg-gray-50 
        hover:shadow-md
        transition-all
        duration-200
        font-title
        w-full
        max-w-full
        overflow-hidden
      "
      >
        {/* Avatar Container */}
        <div className="flex-shrink-0">
          <img
            src={client?.profile?.id?.image}
            alt="Client Avatar"
            className="
              w-10 h-10
              sm:w-12 sm:h-12
              md:w-14 md:h-14
              lg:w-[60px] lg:h-[60px]
              rounded-full
              object-cover
              border-2
              border-gray-100
            "
          />
        </div>

        {/* Info Container */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p
            className="
            text-black 
            font-semibold 
            text-sm
            sm:text-base
            md:text-lg
            truncate
          "
          >
            {client?.profile?.id?.name}
          </p>
          <p
            className="
            text-gray-500 
            text-xs
            sm:text-sm
            md:text-base
            truncate
          "
          >
            {email}
          </p>
        </div>

        {/* Optional: Arrow indicator for clickable card */}
        <div className="flex-shrink-0 hidden sm:block">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
