import './style.css';
import ViewItemsAdd from "../ViewItemsAdd/index.jsx";
import Cart from "../Cart/index.jsx";

function Sell(){

    function addItem(target){
        const id = target.parentNode.id;

    }

    return (
        <div className={'sellContainer'}>
            <div className={'viewItemsContainer'}>
                {<ViewItemsAdd addItem={addItem}/>}
                {<Cart></Cart>}
            </div>
        </div>
    )
}

export default Sell;