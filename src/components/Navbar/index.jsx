import './style.css';
import {menuList} from "../../services/menuData.js";

function Navbar({ changeMenu }) {
    return (
        <div className="navbar">
            <div className="logo">
                <h1>M&S</h1>
                <p>Bebidas</p>
            </div>
            <ul>
                {menuList.map((item, index) => (
                    <li key={index}
                        id={item.id}
                        onClick={(e) => changeMenu(e, item.name)}
                        className={index === 0 ? "selected" : ""}
                    >
                        <div>
                            <img className="icon" src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
