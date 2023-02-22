import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import "../App.css"
const RootLayout = () => {
    return <>
        <div className="App">
            <div className="grid">
                <Menu />
                <main className="container"><Outlet /></main>
                <footer className="bd-footer py-5 mt-5 bg-light">
                    <div className="container">
                        Movies App {new Date().getFullYear()}
                    </div>
                </footer>
            </div>
        </div>
    </>
};

export default RootLayout;