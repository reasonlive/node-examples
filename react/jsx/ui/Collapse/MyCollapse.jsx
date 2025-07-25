import React from 'react';
import s from './MyCollapse.module.css'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Accordion} from "@material-ui/core";
import {
  bodyP2Papprove,
  bodyP2Pcreate,
  loginRequest, loginResponse,
  refundRequestExample,
  refundResponse,
  refundResponseError,
  refundResponseError403,
  requestPurchasesError,
  requestPurchasesError500, responseP2Papprove, responseP2Pcheck, responseP2Pcreate, responseP2PMethods,
  responsePurchases, toolSignatureRequestExample,
  transactionInfoResponse,
  transactionInfoResponseError, transactionsListRequestExample,
  transactionsListResponse, transactionsListResponseError,
  TransactionStatusRequest
} from "../../components/ExampleCodeDataForApi/CodeDataForApi";
import {useTranslation} from "react-i18next";


const MyCollapse = () => {
  const {t} = useTranslation();
  const codeExample = 'headers: Content-Type: application/json,'

  return (
      <div>
        <h3>{t("apiguide.apiTitle")}</h3>
        <h3>{t("apiguide.apiSubtitle")}</h3>
        <p>{t("apiguide.example")}</p>
        <div className={s.mb}>
                <pre>
                    <code>
                        <div className={s.code_block} dangerouslySetInnerHTML={{__html: codeExample}}></div>
                    </code>
                </pre>
        </div>
        <h3 style={{margin: "30px"}}><u>Acquiring transactions:</u></h3>
        <h3 style={{margin: "20px"}}>- Log In:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_URL}api/user/login</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>login</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        your login
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>password </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        your password
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: loginRequest}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: loginResponse}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                  after successful authorization and receiving a token, send this token in the headers with each
                  request <br/>
                  Example : {`" headers : { Content-Type: application/json, Authorization: Bearer TOKEN } "`}
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Tool Signature Request:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_URL}api/transaction/creates/payments</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>payer_id</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        your id in our system (check with the admin)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>owner </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Payer's name (From the card)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>card_number </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>Card number (From the card)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>cvv </b>
                      <div>integer</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>number on the back of the card (From the card)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>validity </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>card expiry date. Example: “01/22” (From card)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>amount </b>
                      <div>float/integer</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>write-off amount
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>currency </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>currency . Example: "USD", always in upper case.
                      </div>
                    </div>
                  </div>
                  {/*<div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>callback_url </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>"https://www.example.com/"
                      </div>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: toolSignatureRequestExample}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responsePurchases}}></div>
                                </div>
                            </pre>
                <div className={s.callback}>
                 <p> Callback - if a customer has provided us with the URL for the callback, we inform the client's server of the Transaction Number and Status via API (if declined, we indicate the reason).</p>

                  <p>Redirect - a customer informs us where to redirect (provide us with their own page or to our page) (we indicate the Transaction Number and Status there (if declined, we specify the reason).</p>

                  <p>After successfully completing 3DS process, you will be redirected to the page that you specified in the desirable redirect page or we will make API call for your callback url.
                  You will also be given 2 parameters - transactionNumber, transactionStatus.<br/>
                    Example: "example.com/?transactionNumber=1234&transactionStatus=2"</p>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Transaction status request:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>GET <code>{process.env.BACKEND_API_URL}api/transaction/transactions/{`{id}`}/status</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>id</b>
                      <div>string</div>
                      <div>($query)</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        transaction number (you receive in the response with a successful request to
                        withdraw funds)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: TransactionStatusRequest}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Refund:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_URL}api/transaction/refunds</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>payer_id</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        your id in our system (check with the admin)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>transaction_id </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        transaction number
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: refundRequestExample}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: refundResponse}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: refundResponseError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  403
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: refundResponseError403}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Transaction info:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>GET <code>{process.env.BACKEND_API_URL}api/transaction/v1/transactions/{`{transaction_number}`}/info</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: transactionInfoResponse}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: transactionInfoResponseError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Transactions list:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_URL}api/transaction/all/transactions/info</code>
            </h5>
          </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>payer_id</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        your id in our system (check with the admin)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>isLiveTransaction </b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        optional (flag test transaction or not)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>startDate</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>optional (passing date in timestamp format)
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>endDate</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>optional (passing date in timestamp format)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: transactionsListRequestExample}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: transactionsListResponse}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: transactionsListResponseError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "30px"}}><u>P2P:</u></h3>
        <h3 style={{margin: "20px"}}>- Payment methods:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_P2P_URL}api/p2p/payments/methods</code>
              </h5>
            </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>apiKey</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Merchant apiKey
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responseP2PMethods}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Creating a payment:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_P2P_URL}api/p2p/payment/create</code>
              </h5>
            </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>apiKey</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Merchant apiKey
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>methodId</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Payment method ID from the methods array of the previous request
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>amount</b>
                      <div>number</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Amount to be paid
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>name</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Full name in order: First name, Middle name, Last name
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: bodyP2Pcreate}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responseP2Pcreate}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Confirmation of payment:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_P2P_URL}api/p2p/payment/approve</code>
              </h5>
            </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>apiKey</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Merchant apiKey
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>paymentId</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Payment ID
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: bodyP2Papprove}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responseP2Papprove}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Cancel payment:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_P2P_URL}api/p2p/payment/cancel</code>
              </h5>
            </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>apiKey</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Merchant apiKey
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>paymentId</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Payment ID
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: bodyP2Papprove}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responseP2Papprove}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <h3 style={{margin: "20px"}}>- Payment status:</h3>
        <Accordion>
          <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <h5 className={s.endpoint_title}>POST <code>{process.env.BACKEND_API_P2P_URL}api/p2p/payment/check</code>
              </h5>
            </AccordionSummary>
          </div>
          <AccordionDetails className={s.flex}>
            <div className={s.subtitle}>
              <b>Parameters</b>
            </div>
            <div className={s.content}>
              <div className={s.responses_block}>
                <div className={s.w100}>
                  <div className={`${s.name} ${s.params}`}>
                    <span className={s.params_name}><b>Name</b></span>
                    <span className={s.params_desc}><b>Description</b></span>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>apiKey</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Merchant apiKey
                      </div>
                    </div>
                  </div>
                  <div className={`${s.name} ${s.params}`}>
                    <div className={s.params_name}>
                      <b>paymentId</b>
                      <div>string</div>
                    </div>
                    <div className={s.params_desc}>
                      <div>
                        Payment ID
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.subtitle}>
              <b>Request Body</b><span className={s.required}>required</span>
            </div>
            <div>
                        <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: bodyP2Papprove}}></div>
                            </div>
                        </pre>
            </div>
            <div className={s.subtitle}>
              <b>Responses</b>
            </div>
            <div>Response status is always HTTP_OK (200)</div>
            <div>
              <b>if success == true, paymentStatus will be either SUCCESS or DENIED, if success == false, the paymentStatus will be WAITING</b>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div className={s.name}>
                  <b>Code</b>
                </div>
                <div>
                  200
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.name}><b>Description</b></div>
                <div>OK</div>
                <div className={s.example}>Example value</div>
                <pre>
                                <div className={s.code_block}>
                                    <div dangerouslySetInnerHTML={{__html: responseP2Pcheck}}></div>
                                </div>
                            </pre>
                <div style={{fontWeight: "bold", fontSize: "18px"}}>
                </div>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  418
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError}}></div>
                            </div>
                        </pre>
              </div>
            </div>
            <div className={s.responses_block}>
              <div className={s.status_code_block}>
                <div>
                  500
                </div>
              </div>
              <div className={s.responses_desc_block}>
                <div className={s.example}>Example value</div>
                <pre>
                            <div className={s.code_block}>
                                <div dangerouslySetInnerHTML={{__html: requestPurchasesError500}}></div>
                            </div>
                        </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
  )
}


export default MyCollapse
