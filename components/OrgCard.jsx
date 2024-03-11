import Link from "next/link";
import React from "react";

const OrgCard = ({
  _id,
  name,
  domain,
  addrLine1,
  addrLine2,
  city,
  state,
  zip,
  phone,
  email,
}) => {
  const formatPhoneNumber = (phoneNumberString) => {
    return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(
      3,
      6
    )}-${phoneNumberString.slice(6)}`;
  };

  return (
    <div className="text-white transition duration-300 shadow-xl card w-96 bg-primary hover:bg-accent hover:shadow-md hover:shadow-black hover:text-black hover:cursor-pointer">
      <div className="card-body">
        <h2 className="underline card-title whitespace-nowrap">{name}</h2>
        <p>
          <em>
            <a href={`https://www.${domain}`} target="_blank">
              {domain}
            </a>
          </em>
        </p>
        <p>
          {addrLine1}
          <br />
          {addrLine2}
          {city} {state}, {zip}
        </p>
        <p>
          <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
          <br />

          <a
            href={`mailto:${email}`}
            className="underline hover:cursor-pointer"
          >
            {email}
          </a>
        </p>
        <div className="justify-end card-actions">
          <Link className="btn btn-primary" href={`/organizations/${_id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrgCard;

// <div className="p-6 mt-2 bg-white rounded-lg shadow-lg w-[500px] cursor-pointer hover:shadow-md">
//   <Link href={`/organizations/${_id}`} passHref>
//     <h1 className="text-2xl font-bold cursor-pointer">{name}</h1>
//   </Link>
//   <p className="text-lg">
//     <a
//       href={`https://www.${domain}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="hover:cursor-pointer hover:font-semibold"
//     >
//       {domain}
//     </a>
//   </p>
//   <p>{addrLine1}</p>
//   <p>{addrLine2}</p>
//   <p>
//     {city} {state}, {zip}
//   </p>
//   <p>{phone}</p>
//   <p>
//     <a href={`mailto:${email}`} className="underline hover:cursor-pointer">
//       {email}
//     </a>
//   </p>
// </div>
