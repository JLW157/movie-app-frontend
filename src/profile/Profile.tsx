import { profileCredentialsType } from "./profile.model";

const Profile = () => {
    const userCredentioanls: profileCredentialsType = {
        email: "mishkafreddy123@gmail.com",
        roles: ["user"],
    };

    return <>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2>Hello, User</h2>
            <h4>You profile info</h4>
            <label>Roles: </label>
            <ul style={{ display: "flex", flex: "row" }} className="role-list">
                {userCredentioanls.roles.map(role => <li key={role}>{role}</li>)}
            </ul>
            <div>
                <label>Email: {`${userCredentioanls.email}`}</label>
            </div>
        </div>
    </>
};

export default Profile;