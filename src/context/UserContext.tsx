import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const defaultUserState: UserContextInterface = {
  user: {
    user_id: "",
    email: "",
    password: "",
    userName: "",
    teamName: "",
    nationality: "",
    isPartialUser: false,
    accessToken: "",
  },
  setUser: () => {},
};

export const UserContext =
  createContext<UserContextInterface>(defaultUserState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUserState.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
