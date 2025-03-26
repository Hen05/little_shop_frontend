import './style.css';
import {formatToReal} from "../../../services/formatter.js";

function FinishBuy({finishBuy, cartItems = [], cancelBuy}){
    return(
      <div className="finishBuyContainer">
          <h1>Carrinho de Compras</h1>
          <div className={'cartGrid'}>
              {cartItems.map((item, index) => (
                  <div className={'cartItem-fb'} index={index} id={item.id}>
                      <div
                          className={'cartItemImg'}
                          style={{backgroundImage: `url('${item.image}')`}}>
                      </div>
                      <div className={'cartInfos'}>
                          <div className={'cartItemName'}>{item.name}</div>
                          <div className={'cartItemPrice'}>{formatToReal(item.price)}</div>
                          <div className={'cartAmount'}>{item.amount}</div>
                      </div>
                  </div>
              ))}
          </div>
          <div className={'finishArea'}>
              <select>
                  <option disabled selected>Selecione a forma de pagamento</option>
                  <option>Dinheiro</option>
                  <option>Cartão de Crédito</option>
                  <option>Cartão de Débito</option>
                  <option>Pix</option>
                  <option>Outro</option>
              </select>
              <button onClick={finishBuy}>Finalizar</button>
              <button className={'cancel'} onClick={cancelBuy}>Cancelar</button>
          </div>
      </div>
    );
}

export default FinishBuy;