import React from "react";

interface User {
  userName: string;
  setUserName: (nombre: string) => void;
}

export const UserContext = React.createContext<User>({
  userName: "",
  setUserName: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const DataUserContext: React.FC<Props> = (props) => {
  const { children } = props;
  const [userName, setUserName] = React.useState<string>("");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
