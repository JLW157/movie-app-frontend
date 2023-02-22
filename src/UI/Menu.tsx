import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../auth/auth-context";
import Authorized from "../auth/Authorized";
import { logout } from "../auth/handleJwt";
import Button from "./Button";

const Menu = () => {
    const ctx = useContext(AuthContext);

    function getUserEmail(): string {
        return ctx.claims.filter(x => x.name === "email")[0]?.value;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">React movies</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/movies/filter" className="nav-link">
                                Filter Movies
                            </NavLink>
                        </li>
                        <Authorized authorized={<>
                            <li className="nav-item">
                                <NavLink to="genres" className="nav-link">
                                    Genres
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="actors" className="nav-link">
                                    Actors
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="movie-theathers" className="nav-link">
                                    Movie Theathers
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/movies/create" className="nav-link">
                                    Create Movie
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/users" className="nav-link">
                                    Users
                                </NavLink>
                            </li>
                        </>} role="admin" />

                    </ul>
                    <div className="d-flex">
                        <Authorized authorized={<>
                            <span className="nav-link">Hello, {getUserEmail()}</span>
                            <Button className="nav-link btn btn-link"
                                onClick={() => {
                                    logout();
                                    ctx.update([])
                                }}>Logout</Button>
                        </>}
                            nonAuthorized={<>
                                <Link to={"/register"}
                                    className={"nav-link btn btn-link"}>Register</Link>
                                <Link to={"/login"}
                                    className={"nav-link btn btn-link"}>Login</Link>
                            </>}></Authorized>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Menu;