import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/Firebase/firebase";
import DomoApi from "@/API/domoAPI";
import { CollectionName, AuthRole, ProviderName } from "@/data/mockData";
import { LoginFieldProps } from "@/types/Login.types";

export const googleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (!result?.user) return null;

    const user = result.user;

    const existingUsers = (await DomoApi.ListDocuments(
      CollectionName.FOODAPP_USERS,
    )) as {
      content: LoginFieldProps;
    }[];

    let existingUser = existingUsers.find(
      (u) => u.content?.email === user.email,
    );

    if (!existingUser) {
      const newUser = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        phone: "",
        password: "",
        authProvider: ProviderName.GOOGLE,
        providerId: user.uid,
        createdAt: new Date().toISOString(),
        role: AuthRole.USER,
      };

      const response = await DomoApi.CreateDocument(
        CollectionName.FOODAPP_USERS,
        newUser,
      );

      localStorage.setItem("userData", JSON.stringify(response));
      return response;
    }

    localStorage.setItem("userData", JSON.stringify(existingUser));
    return existingUser;
  } catch (error) {
    console.error("Google login error", error);
    return null;
  }
};
