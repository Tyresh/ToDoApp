import React, { useState, useEffect } from "react";
import { ContainerForm, ContentForm } from "../globalStyles";
import { UsersContainer, UlUser, DivLiUser, UserEmpty } from "./styles";
import { LogOutButton } from "../ToDoPage/styles";
import { useHistory } from "react-router";
import { signUserOut } from "../../services/hooks/signUserOut";
import { getAllUsers } from "../../services/hooks/getAllUsers";
import { storeRef } from "../../services/firebase";

function AdminPage() {
  const history = useHistory();
  const [usersState, setUsersState] = useState<any[]>([]);
  const [logoUrlState, setLogoUrlState] = useState("");

  useEffect(() => {
    const getToDos = async () => {
      let userTypes_user: any[] = [];
      const allUsers = await getAllUsers();
      allUsers.forEach((e) => {
        if (e.type === "user") {
          userTypes_user.push(e);
        }
      });
      setUsersState(userTypes_user);
    };
    getToDos();
  }, usersState);

  useEffect(() => {
    const getLogo = async () => {
      const logo = await storeRef
        .ref("todo-logo.webp")
        .getDownloadURL()
        .then((url) => url);
      setLogoUrlState(logo);
    };
    getLogo();
  }, []);

  const handleSignOutButton = () => {
    signUserOut().then(() => {
      const path = "/";
      history.push(path);
    });
  };

  return (
    <>
      {logoUrlState && usersState ? (
        <ContainerForm>
          <ContentForm
            style={{
              height: "80vh",
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={logoUrlState}
              style={{ width: "100px", height: "100px" }}
            />
            <h1>User List</h1>
            <LogOutButton onClick={handleSignOutButton}>Logout</LogOutButton>
            <UsersContainer>
              <UlUser>
                {usersState.length > 0 ? (
                  usersState?.map((item) => (
                    <DivLiUser>
                      <li key={item.email} style={{ paddingLeft: "40px" }}>
                        <h3>User's email: {item.email}</h3>
                        <h3>
                          That user currently have {item.toDos.length} toDos.
                        </h3>
                      </li>
                    </DivLiUser>
                  ))
                ) : (
                  <UserEmpty>
                    <h2>There's no Users currently.</h2>
                  </UserEmpty>
                )}
              </UlUser>
            </UsersContainer>
          </ContentForm>
        </ContainerForm>
      ) : (
        <></>
      )}
    </>
  );
}

export default AdminPage;
