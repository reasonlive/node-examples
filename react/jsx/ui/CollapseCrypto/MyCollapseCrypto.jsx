import React from 'react';
import s from './MyCollapseCrypto.module.css'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Accordion} from "@material-ui/core";

const MyCollapseCrypto = () => {

  return (
      <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", padding: "10px 0"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>/api/payment/address/get</code>{' '}
            <span className={s.code_text}>(get new dynamic address)</span>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>JSON PARAMETERS:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>coin:</div>
                    </div>
                    <div className={s.params_desc}>btc/trx/eth</div>
                  </div>
            </div>
            <div className={s.subtitle}>
              <b>JSON RESPONSE:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>coin:</div>
                    </div>
                    <div className={s.params_desc}>btc/trx/eth</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>expiredAt:</div>
                    </div>
                    <div className={s.params_desc}>end of address activity</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", padding: "10px 0"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>/api/payment/address/balance/get</code>{' '}
            <span className={s.code_text}>(get balance of the dynamic address)</span>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>JSON PARAMETERS:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address (for balance check)</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt (optional):</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null (for check usdt balance)</div>
                  </div>
            </div>
            <div className={s.subtitle}>
              <b>JSON RESPONSE:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>coin:</div>
                    </div>
                    <div className={s.params_desc}>btc/trx/eth</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt:</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>balance:</div>
                    </div>
                    <div className={s.params_desc}>balance in crypto currency or usdt</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", padding: "10px 0"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>/api/payment/address/transactions/check</code>{' '}
            <span className={s.code_text}>(check new incoming transactions to the dynamic address)</span>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>JSON PARAMETERS:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address (for check incoming transactions)</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt (optional):</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null (for check usdt transactions)</div>
                  </div>
            </div>
            <div className={s.subtitle}>
              <b>JSON RESPONSE:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>coin:</div>
                    </div>
                    <div className={s.params_desc}>btc/trx/eth</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt:</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>newTransactions:</div>
                    </div>
                    <div className={s.params_desc}>new incoming transactions of the address</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", padding: "10px 0"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>/api/payment/address/transactions/observe</code>{' '}
            <span className={s.code_text}>(observe new incoming transactions to the dynamic address until expiration date)</span>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>JSON PARAMETERS:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address (for check incoming transactions)</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt (optional):</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null (for check usdt transactions)</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>callbackUrl (optional):</div>
                    </div>
                      <div className={s.params_desc}>merchant url for receiving incoming transactions info
                          <div className={s.code_text}>if it not provided, will be used callback from account
                              settings</div>
                      </div>

                  </div>
            </div>
              <div className={s.subtitle}>
              <b>JSON RESPONSE:</b>
            </div>
            <div className={s.content}>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>message:</div>
                    </div>
                    <div className={s.params_desc}>information message if process was started</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>callback:</div>
                    </div>
                    <div className={s.params_desc}>url for receiving incoming transactions</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>address:</div>
                    </div>
                    <div className={s.params_desc}>crypto address</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>coin:</div>
                    </div>
                    <div className={s.params_desc}>btc/trx/eth</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>usdt:</div>
                    </div>
                    <div className={s.params_desc}>trc20/erc20/bep20/null</div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                    <div className={s.text}>apiKey:</div>
                    </div>
                    <div className={s.params_desc}>merchant API key</div>
                  </div>
            </div>
            <div className={s.subtitle}>
              <b>JSON RESPONSE TO THE CALLBACK URL:</b>
            </div>
            <div className={s.content}>
              <div className={s.params_desc}>&#91;&#123;
                  <div>timestamp: time when transaction was created in milliseconds,</div>
                  <div>hash: txid,</div>
                  <div>from: from address (nullable if btc),</div>
                  <div>to: to address,</div>
                  <div>amount: transaction amount,</div>
                  <div>currency: crypto currency or tokens,</div>
                  <div>status: transaction status,</div>
                  <div>token(nullable): token standard (erc20/bep20/trc20/null),</div>
                  <div>fee(nullable): blockchain fee,</div>
                  <div>block(nullable): number of transaction block in blockchain</div>
                  &#125;&#93;
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        
      </div>
  )
}


export default MyCollapseCrypto
