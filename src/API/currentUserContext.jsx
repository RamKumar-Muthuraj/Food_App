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
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = async (id) => {
    try {
      const res = await DomoApi.GetDocument(
        CollectionName.FOODAPP_USERS,
        id
      );

      const user = res?.content;

      setCurrentUser(user);
      setCurrentUserId(res?.id);
      setRole(user?.role || AuthRole.USER);
    } catch (error) {
      console.error("User fetch failed", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetchUser(userId);
  }, []);

  const refreshUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) fetchUser(userId);
  };

  const logout = () => {
    localStorage.clear();

    setCurrentUser(null);
    setCurrentUserId("");
    setRole("");

    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserId,
        role,
        logout,
        refreshUser,  
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(UserContext);
