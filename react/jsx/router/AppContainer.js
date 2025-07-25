import {Route, Routes} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import ApiGuide from "../pages/ApiGuide/ApiGuide";
import {ApiCrypto} from "../pages/ApiCrypto/ApiCrypto";
import Accounts from "../pages/PersonalAccount/AccountAcquiring/Accounts";
import PersonalAccount from "../pages/PersonalAccount/AccountAcquiring/PersonalAccount";
import * as Transactions from "../pages/PersonalAccount/AccountAcquiring/AcquiringTransactions";
import Pricing from "../pages/Pricing/Pricing";
import {PrivacyPolicy} from "../pages/PrivacyPolicy/PrivacyPolicy";
import {PaymentMethods} from "../pages/PaymentMethods/PaymentMethods";
import {Cards} from "../pages/PaymentMethods/Cards/Cards";
import {Wallets} from "../pages/PaymentMethods/Wallets/Wallets";
import {BankTransfers} from "../pages/PaymentMethods/BankTransfers/BankTransfers";
import {P2P} from "../pages/PersonalAccount/AccountP2P/P2P/P2P";
import PersonalAccountP2P from "../pages/PersonalAccount/AccountP2P/PersonalAccountP2P/PersonalAccountP2P";
import AccountsP2P from "../pages/PersonalAccount/AccountP2P/AccountsP2P";
import LoginP2P from "../pages/Login/LoginP2P";
import {PageNotFound} from "../pages/PageNotFound/PageNotFound";
import {FormP2PHOC} from "../pages/PersonalAccount/AccountP2P/FormP2PHOC/FormP2PHOC";
import {SeparateLinkP2P} from "../pages/PersonalAccount/AccountP2P/FormP2PHOC/SeparateLinkP2P";
import LoginCrypto from "../pages/Login/LoginCrypto";
import CryptoPersonalAccount from "../pages/PersonalAccount/Crypto/PersonalAccount";
import CryptoAccounts from "../pages/PersonalAccount/Crypto/Accounts/Accounts";
import CryptoSettings from "../pages/PersonalAccount/Crypto/Settings/Settings";
import Acquiring from "../pages/PersonalAccount/Crypto/Acquiring/Acquiring";

export const AppContainer = () => {

  return (
      <Routes>
          <Route path={`/api/p2p/form/:apiKey`} element={<FormP2PHOC/>}/>
          <Route path={'/api/p2p'} element={<SeparateLinkP2P/>} />
          <Route path='*' element={<PageNotFound />}/>
          <Route path='/' element={<App/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/loginP2P' element={<LoginP2P />}/>
          <Route path='/login-crypto' element={<LoginCrypto />}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/api' element={<ApiGuide/>}/>
          <Route path='/apiCrypto' element={<ApiCrypto/>}/>
          <Route path='/payment-methods' element={<PaymentMethods/>}/>
          <Route path='/payment-methods/cards' element={<Cards />}/>
          <Route path='/payment-methods/wallets' element={<Wallets />}/>
          <Route path='/payment-methods/bank-transfers' element={<BankTransfers />}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
            <Route path='/acquiring' element={<PersonalAccount />}>
              <Route path='personal' element={<Transactions />}/>
              <Route path='accounts' element={<Accounts/>} />
            </Route>
            <Route path='/P2P' element={<PersonalAccountP2P />}>
              <Route path='personal' element={<P2P />} />
              <Route path='accounts' element={<AccountsP2P />} />
            </Route>
            <Route path='/crypto' element={<CryptoPersonalAccount />}>
              <Route path='accounts' element={<CryptoAccounts />} />
              <Route path='settings' element={<CryptoSettings />} />
              <Route path='acquiring' element={<Acquiring />} />
            </Route>
                  {/*<Route path='api-settings' element={<ApiSettings />}/>*/}
                  {/*<Route path='rolling-reserve' element={<RollingReserve/>}/>*/}
      </Routes>
  )

}


