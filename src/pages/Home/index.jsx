import './style.css';
import Navbar from '../../components/Navbar';
import {useEffect, useState} from "react";
import HomeArea from "../../components/HomeArea";
import ViewItems from "../../components/ViewItems";
import AddItems from "../../components/AddItems";
import ViewGraphics from "../../components/ViewGraphics";
import {menuList} from "../../services/menuData.js";
import Sell from "../../components/Sell";
import AddStock from "../../components/AddStock/index.jsx";
import AttPrice from "../../components/AttPrice/index.jsx";
import ViewData from "../../components/ViewData/index.jsx";

function Index() {
    const [isHomeArea, setIsHomeArea] = useState(false);
    const [isSell, setIsSell] = useState(false);
    const [isViewItems, setIsViewItems] = useState(false);
    const [isAddItems, setIsAddItems] = useState(false);
    const [isViewGraphics, setIsViewGraphics] = useState(false);
    const [isAddStock, setIsAddStock] = useState(false);
    const [isAttPrice, setIsAttPrice] = useState(false);
    const [isViewData, setIsViewData] = useState(false);

    const setFunc = {
        'home': (value) => setIsHomeArea(value),
        'sell': value => setIsSell(value),
        'addStock': (value) => setIsAddStock(value),
        'attPrice': (value) => setIsAttPrice(value),
        'seeItems': (value) => setIsViewItems(value),
        'addItems': (value) => setIsAddItems(value),
        'viewGraphics': (value) => setIsViewGraphics(value),
        'viewData': (value) => setIsViewData(value)
    }

    useEffect(() => {
        setIsHomeArea(true);
        setIsSell(false);
        setIsAddStock(false);
        setIsViewItems(false);
        setIsAddItems(false);
        setIsViewGraphics(false);
        setIsViewData(false);
    }, [])

    function handleChangeMenu(e){
        const id = menuList
            .find(menu => menu.name === e.target.innerText)
            .id;

        const selectedItem = document.querySelector('.selected');

        if(selectedItem.id !== id){
            selectedItem.classList.remove('selected');
            setFunc[selectedItem.id](false);
            setFunc[id](true);
            const newSelect = document.querySelector(`#${id}`);
            newSelect.classList.add('selected');
        }

    }

    function onSuccessAddItem(){
        alert('Item adicionado com sucesso')
    }

    function onError(error){
        alert(error.message);
    }

    return (
        <div>
            <Navbar changeMenu={handleChangeMenu}/>
            <div className="mainContainer">
                {isHomeArea && <HomeArea/>}
                {isSell && <Sell/>}
                {isAttPrice && <AttPrice/>}
                {isAddStock && <AddStock/>}
                {isViewItems && <ViewItems/>}
                {isAddItems && <AddItems
                    onAddItems={(message) => onSuccessAddItem(message)}
                    onError={onError}
                />}
                {isViewGraphics && <ViewGraphics/>}
                {isViewData && <ViewData/>}
            </div>
        </div>

    );
}

export default Index;
