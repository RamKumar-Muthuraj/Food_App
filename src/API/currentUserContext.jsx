/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import DomoApi from "./domoAPI";
import { AuthRole, CollectionName } from "@/data/mockData";

export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState("");
//   const [currentUserId, setCurrentUserId] = useState("");
//   const [avatarKey, setAvatarKey] = useState("");
//   const [customer, setCustomer] = useState("");
//   const [host, setHost] = useState("");

//   useEffect(() => {
//     let isUserFetched = false;

//     DomoApi.GetCurrentUser().then((data) => {
//       // console.log("User Data",data);

//       if (!isUserFetched) {
//         const userId = data?.userId;
//         const displayName = data?.displayName;
//         const avatarKey = data?.avatarKey;
//         const customer=data?.customer;
//         const host=data?.host;

//         setCurrentUser(displayName || "");
//         setCurrentUserId(userId || "");
//         setAvatarKey(avatarKey || "");
//         setCustomer(customer || "");
//         setHost(host || "");

//         isUserFetched = true;
//       }
//     });

//     return () => {
//       isUserFetched = true;
//     };
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         currentUser,
//         currentUserId,
//         avatarKey,
//         customer,
//         host
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  // const [avatarKey, setAvatarKey] = useState("");
  // const [customer, setCustomer] = useState("");
  // const [host, setHost] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    let isUserFetched = false;
    const data = localStorage.getItem("userData");
    const userData = JSON.parse(data);

    if (!userData) return;

    DomoApi.GetDocument(CollectionName.FOODAPP_USERS, userData.id).then(
      (data) => {
        if (!isUserFetched) {
          const userId = data?.id;
          const displayName = data?.content.firstName;
          const lastName = data?.content.lastName;
          const role = data?.content.role;

          setCurrentUser(displayName || "");
          setCurrentUserId(userId || "");
          setRole(role || AuthRole.USER);
          // setAvatarKey(avatarKey || "");
          // setCustomer(customer || "");
          // setHost(host || "");

          isUserFetched = true;
        }
      },
    );

    return () => {
      isUserFetched = true;
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserId,
        // avatarKey,
        // customer,
        // host,
        role,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(UserContext);
