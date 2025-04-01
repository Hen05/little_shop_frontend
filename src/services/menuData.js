import homeIcon from '../assets/icons/home-op2.png';
import itemIcon from '../assets/icons/item.png';
import graphicsIcon from '../assets/icons/graphics.png';
import menuItemsIcon from '../assets/icons/menu-items.png';
import sellIcon from '../assets/icons/sell.png';
import stockIcon from '../assets/icons/stock.png';

export const menuList = [
    { id: 'home', name: "Home", icon: homeIcon},
    { id: 'sell', name: 'Venda', icon: sellIcon},
    { id: 'seeItems', name: "Visualizar Items", icon: menuItemsIcon },
    { id: 'addStock', name: 'Adicionar Estoque', icon: stockIcon},
    { id: 'attPrice', name: "Atualizar Preço", icon: homeIcon},
    { id: 'addItems', name: "Adicionar Items", icon: itemIcon },
    { id: 'viewGraphics', name: "Visualizar Vendas", icon: graphicsIcon },
    { id: 'viewData', name: "Visualizar Dados", icon: itemIcon },
];