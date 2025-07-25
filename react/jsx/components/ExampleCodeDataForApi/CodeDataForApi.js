export const toolSignatureRequestExample = '{ \n' +
    '   "payer_id": "1234", \n' +
    '   "owner": "Name Name", \n' +
    '   "card_number": "4242424242424242", \n' +
    '   "cvv": "123", \n' +
    '   "validity": "01/22", \n' +
    '   "amount": "12.3", \n' +
    '   "currency": "USD" \n' +
   /* '   "callback_url": "https://www.example.com/" \n' +*/
    '}'

export const refundRequestExample = '{ \n' +
    '   "payer_id": "1234", \n' +
    '   "transaction_id": "333333", \n' +
    '}'

export const transactionsListRequestExample = '{ \n' +
    '   "payer_id": "1234", \n' +
    '   "isLiveTransaction": "test/live", \n' +
    '   "startDate": "1652356619", \n' +
    '   "endDate": "1652356619", \n' +
    '}'

export const requestPurchases = '{\n' +
    '  "client": {\n' +
    '    "email": "test@test.com"\n' +
    '  },\n' +
    '  "purchase": {\n' +
    '    "products": [\n' +
    '      {\n' +
    '        "name": "test",\n' +
    '        "price": 100\n' +
    '      }\n' +
    '    ]\n' +
    '  },\n' +
    '  "brand_id": "409eb80e-3782-4b1d-afa8-b779759266a5"\n' +
    '}';

export const responsePurchases = '{\n' +
    ' “status” : 200,\n' +
    '  “result” : {\n' +
    '    “transaction” : “transaction number” ,(99681628714189)\n' +
    '    “status”: 1|2|3|5,,\n' +
    '    “redirect_url”: “http://exemple.com/…..” (3DS, option),\n' +
    '  },\n' +
    '} \n' +
    '\n' +
    '  *redirect_url - url to redirect the user to pass 3DS.\n' +
    '  after passing the 3DS, the user will be redirected to the authentication completion page.\n' +
    '  Possible statuses:\n' +
    '  STATUS_IN_PROCESS = 1;\n' +
    '  STATUS_APPROVED = 2;\n' +
    '  STATUS_DENIED = 3;\n' +
    '  STATUS_WAITING_ CONFIRMATION = 5;\n' +
    '  “status”: “STATUS_IN_PROCESS” - Transaction in progress, check status after a while\n' +
    '  “status”: “STATUS_APPROVED” - Transaction completed \n' +
    '  “status”: “STATUS_DENIED” - The transaction was NOT completed due to reasons beyond our control \n' +
    '  “status”: “STATUS_WAITING_ CONFIRMATION” - waiting for confirmation from the user '

export const TransactionStatusRequest = '{\n' +
    ' “status” : 200,\n' +
    '  “result” : {\n' +
    '    “status” : (int) transaction status\n' +
    '  },\n' +
    '} \n' +
    '\n' +
    '  Possible statuses:\n' +
    '  STATUS_IN_PROCESS = 1;\n' +
    '  STATUS_APPROVED = 2;\n' +
    '  STATUS_DENIED = 3;\n' +
    '  STATUS_REFUND = 4;;\n' +
    '  STATUS_WAITING_ CONFIRMATION = 5;'

export const refundResponse = '{\n' +
    ' “status” : 200,\n' +
    ' “result” : "OK"\n' +
    '} \n'
;

export const loginResponse = '{\n' +
' “status” : 200,\n' +
' “result” : "TOKEN"\n' +
    '} \n'
;

export const refundResponseError = '{\n' +
    ' “status” : 418,\n' +
    ' “errors” : “Query params is not valid”\n' +
    '} \n'
;

export const refundResponseError403 = '{\n' +
    ' “status” : 403,\n' +
    ' “errors” : “Query params is not valid”\n' +
    '} \n'
;


export const requestPurchasesError = '{\n' +
    ' “status” : 418,\n' +
    '  “errors” : [\n' +
    '    ..// Errors (example: \'parameter is missing: validity\')\n' +
    '  ],\n' +
    '} \n'
;

export const transactionInfoResponse = '{\n' +
    ' “status” : 200,\n' +
    '  “result” : {\n' +
    '    "transaction_number": "94621337271640",\n' +
    '    "transaction_status": 3,\n' +
    '    "transaction_amount": 0.01,\n' +
    '    "net_amount": 0.01,\n' +
    '    "transaction_date_time": "2021-11-22 08:40:40 UTC",\n' +
    '    "is_live_transaction": true,\n' +
    '    "card_owner_name": "Test Test",\n' +
    '    "card_number": "6690"\n' +
    '  },\n' +
    '}'

export const transactionInfoResponseError = '{\n' +
    ' “status” : 418,\n' +
    ' “errors” : “Transaction is not found”\n' +
    '} \n'
;

export const transactionsListResponse = '{\n' +
    ' “status” : 200,\n' +
    '  “result” : \n' +
    '  [\n' +
    '   {\n' +
    '    "transaction_number": "94621337271640",\n' +
    '    "transaction_status": 3,\n' +
    '    "transaction_amount": 0.01,\n' +
    '    "net_amount": 0.01,\n' +
    '    "transaction_date_time": "2021-11-22 08:40:40 UTC",\n' +
    '    "is_live_transaction": true,\n' +
    '    "card_owner_name": "Test Test",\n' +
    '    "card_number": "6690"\n' +
    '   },\n' +
    '   {...},\n' +
    '   {...},\n' +
    '   {...},\n' +
    '   {...},\n' +
    '   {...},\n' +
    ' ]\n' +
'}'

export const transactionsListResponseError = '{\n' +
    ' “status” : 418,\n' +
    ' “errors” : “Missing params”\n' +
    '} \n'
;

export const loginRequest = '{\n' +
    ' “login” : “Your_login”,\n' +
    ' “password” : “Your_password”,\n' +
    '} \n'
;


export const requestPurchasesError500 = '{\n' +
    ' “status” : 500,\n' +
    ' “errors” : “Server Error - {message}”\n' +
    '} \n'
;

export const amount = '{\n' +
    '  "amount": 0\n' +
    '}'

export const amountRefund = '{\n' +
    '  "amount": 120\n' +
    '}'


export const charge = '{\n' +
    '  "recurring_token": "ea582899-78ec-4c3a-9cb3-08f922e556b6"\n' +
    '}'

export const paidOn = '{\n' +
    '  "paid_on": 1635162311\n' +
    '}'


export const paymentsMethod = '{\n' +
    '  "available_payment_methods": [\n' +
    '    "visa",\n' +
    '    "mastercard",\n' +
    '    "some_method"\n' +
    '  ],\n' +
    '  "by_country": {\n' +
    '    "any": [\n' +
    '      "card"\n' +
    '    ],\n' +
    '    "GB": [\n' +
    '      "some_method"\n' +
    '    ]\n' +
    '  },\n' +
    '  "country_names": {\n' +
    '    "any": "Other",\n' +
    '    "GB": "United Kingdom"\n' +
    '  },\n' +
    '  "names": {\n' +
    '    "visa": "Visa",\n' +
    '    "mastercard": "Mastercard",\n' +
    '    "some_method": "Some method"\n' +
    '  },\n' +
    '  "logos": {\n' +
    '    "some_method": [\n' +
    '      "/static/images/icon-visa.svg",\n' +
    '      "/static/images/icon-mastercard.svg",\n' +
    '      "/static/images/icon-maestro.svg"\n' +
    '    ],\n' +
    '    "visa": "/static/images/icon-visa.svg",\n' +
    '    "mastercard": "/static/images/icon-mastercard.svg"\n' +
    '  },\n' +
    '  "card_methods": [\n' +
    '    "american_express",\n' +
    '    "visa"\n' +
    '  ]\n' +
    '}'

export const billingCode = '{\n' +
    '  "clients": [\n' +
    '    {\n' +
    '      "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "payment_method_whitelist": [\n' +
    '        "string"\n' +
    '      ]\n' +
    '    }\n' +
    '  ],\n' +
    '  "purchase": {\n' +
    '    "currency": "str",\n' +
    '    "products": [\n' +
    '      {\n' +
    '        "name": "string",\n' +
    '        "quantity": "1",\n' +
    '        "price": 0,\n' +
    '        "discount": 0,\n' +
    '        "tax_percent": "0",\n' +
    '        "category": "string"\n' +
    '      }\n' +
    '    ],\n' +
    '    "language": "Default value is controlled in Company -> Brand section of merchant portal separately per each Brand used (default value, \n' +
    '    if no changes are made, is `en`). Brand to be used with corresponding Purchase/BillingTemplate specified using brand_id.",\n' +
    '    "notes": "string",\n' +
    '    "debt": 0,\n' +
    '    "subtotal_override": null,\n' +
    '    "total_tax_override": null,\n' +
    '    "total_discount_override": null,\n' +
    '    "total_override": null,\n' +
    '    "request_client_details": [],\n' +
    '    "timezone": "Europe/Oslo",\n' +
    '    "due_strict": false\n' +
    '  },\n' +
    '  "brand_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "title": "string",\n' +
    '  "is_subscription": true,\n' +
    '  "invoice_issued": "2020-04-30",\n' +
    '  "invoice_due": 1619740800,\n' +
    '  "invoice_skip_capture": false,\n' +
    '  "invoice send_receipt": false,\n' +
    '  "subscription_period": 1,\n' +
    '  "subscription_period_units": "months",\n' +
    '  "subscription_due_period": 7,\n' +
    '  "subscription_due_period_units": "days",\n' +
    '  "subscription_charge_period_end": false,\n' +
    '  "subscription_trial_periods": 0,\n' +
    '  "subscription_active": false,\n' +
    '  "force_recurring": false\n' +
    '}'

export const billingResponse = '[\n' +
    '  "720e2c96-ef94-4baa-90b6-d61ef6fd675a"\n' +
    ']'


export const billingTemplate = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "purchase": {\n' +
    '    "currency": "str",\n' +
    '    "products": [\n' +
    '      {\n' +
    '        "name": "string",\n' +
    '        "quantity": "1",\n' +
    '        "price": 0,\n' +
    '        "discount": 0,\n' +
    '        "tax_percent": "0",\n' +
    '        "category": "string"\n' +
    '      }\n' +
    '    ],\n' +
    '    "total": 0,\n' +
    '    "language": "Default value is controlled in Company -> Brand section of merchant portal separately per each Brand used (default value, \n' +
    '    if no changes are made, is `en`). Brand to be used with corresponding Purchase/BillingTemplate specified using brand_id.",\n' +
    '    "notes": "string",\n' +
    '    "debt": 0,\n' +
    '    "subtotal_override": null,\n' +
    '    "total_tax_override": null,\n' +
    '    "total_discount_override": null,\n' +
    '    "total_override": null,\n' +
    '    "request_client_details": [],\n' +
    '    "timezone": "Europe/Oslo",\n' +
    '    "due_strict": false,\n' +
    '    "email_message": "string"\n' +
    '  },\n' +
    '  "company_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "is_test": true,\n' +
    '  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "brand_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "title": "string",\n' +
    '  "is_subscription": true,\n' +
    '  "invoice_issued": "2020-04-30",\n' +
    '  "invoice_due": 1619740800,\n' +
    '  "invoice_skip_capture": false,\n' +
    '  "invoice send_receipt": false,\n' +
    '  "subscription_period": 1,\n' +
    '  "subscription_period_units": "months",\n' +
    '  "subscription_due_period": 7,\n' +
    '  "subscription_due_period_units": "days",\n' +
    '  "subscription_charge_period_end": false,\n' +
    '  "subscription_trial_periods": 0,\n' +
    '  "subscription_active": false,\n' +
    '  "subscription_has_active_clients": true,\n' +
    '  "force_recurring": false\n' +
    '}'

export const billingTemplatePut = '{\n' +
    '  "purchase": {\n' +
    '    "currency": "str",\n' +
    '    "products": [\n' +
    '      {\n' +
    '        "name": "string",\n' +
    '        "quantity": "1",\n' +
    '        "price": 0,\n' +
    '        "discount": 0,\n' +
    '        "tax_percent": "0",\n' +
    '        "category": "string"\n' +
    '      }\n' +
    '    ],\n' +
    '    "language": "Default value is controlled in Company -> Brand section of merchant portal separately per each Brand used (default value, \n' +
    '    if no changes are made, is `en`). Brand to be used with corresponding Purchase/BillingTemplate specified using brand_id.",\n' +
    '    "notes": "string",\n' +
    '    "debt": 0,\n' +
    '    "subtotal_override": null,\n' +
    '    "total_tax_override": null,\n' +
    '    "total_discount_override": null,\n' +
    '    "total_override": null,\n' +
    '    "request_client_details": [],\n' +
    '    "timezone": "Europe/Oslo",\n' +
    '    "due_strict": false\n' +
    '  },\n' +
    '  "brand_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "title": "string",\n' +
    '  "is_subscription": true,\n' +
    '  "invoice_issued": "2020-04-30",\n' +
    '  "invoice_due": 1619740800,\n' +
    '  "invoice_skip_capture": false,\n' +
    '  "invoice send_receipt": false,\n' +
    '  "subscription_period": 1,\n' +
    '  "subscription_period_units": "months",\n' +
    '  "subscription_due_period": 7,\n' +
    '  "subscription_due_period_units": "days",\n' +
    '  "subscription_charge_period_end": false,\n' +
    '  "subscription_trial_periods": 0,\n' +
    '  "subscription_active": false,\n' +
    '  "force_recurring": false\n' +
    '}'

export const clientId = '{\n' +
    '  "client_id": "b79d3df6-2f69-4426-acee-eda049d83e18"\n' +
    '}'


export const billingTemplateClient = '{\n' +
    '  "billing_template_client": {\n' +
    '    "type": "string",\n' +
    '    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "created_on": 1619740800,\n' +
    '    "updated_on": 1619740800,\n' +
    '    "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "status": "inactive",\n' +
    '    "subscription_billing_scheduled_on": "2020-04-30",\n' +
    '    "payment_method_whitelist": [\n' +
    '      "string"\n' +
    '    ]\n' +
    '  },\n' +
    '  "purchase": {\n' +
    '    "type": "string",\n' +
    '    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "created_on": 1619740800,\n' +
    '    "updated_on": 1619740800,\n' +
    '    "client": {\n' +
    '      "bank_account": "string",\n' +
    '      "bank_code": "string",\n' +
    '      "email": "user@example.com",\n' +
    '      "phone": "+44 45643564564",\n' +
    '      "full_name": "string",\n' +
    '      "personal_code": "string",\n' +
    '      "street_address": "string",\n' +
    '      "country": "st",\n' +
    '      "city": "string",\n' +
    '      "zip_code": "string",\n' +
    '      "shipping_street_address": "string",\n' +
    '      "shipping_country": "st",\n' +
    '      "shipping_city": "string",\n' +
    '      "shipping_zip_code": "string",\n' +
    '      "cc": [\n' +
    '        "user@example.com"\n' +
    '      ],\n' +
    '      "bcc": [\n' +
    '        "user@example.com"\n' +
    '      ],\n' +
    '      "legal_name": "string",\n' +
    '      "brand_name": "string",\n' +
    '      "registration_number": "string",\n' +
    '      "tax_number": "string"\n' +
    '    },\n' +
    '    "purchase": {\n' +
    '      "currency": "str",\n' +
    '      "products": [\n' +
    '        {\n' +
    '          "name": "string",\n' +
    '          "quantity": "1",\n' +
    '          "price": 0,\n' +
    '          "discount": 0,\n' +
    '          "tax_percent": "0",\n' +
    '          "category": "string"\n' +
    '        }\n' +
    '      ],\n' +
    '      "total": 0,\n' +
    '      "language": "Default value is controlled in Company -> Brand section of merchant portal separately per each Brand used (default value, \n' +
    '      if no changes are made, is `en`). Brand to be used with corresponding Purchase/BillingTemplate specified using brand_id.",\n' +
    '      "notes": "string",\n' +
    '      "debt": 0,\n' +
    '      "subtotal_override": null,\n' +
    '      "total_tax_override": null,\n' +
    '      "total_discount_override": null,\n' +
    '      "total_override": null,\n' +
    '      "request_client_details": [],\n' +
    '      "timezone": "Europe/Oslo",\n' +
    '      "due_strict": false,\n' +
    '      "email_message": "string"\n' +
    '    },\n' +
    '    "payment": {\n' +
    '      "is_outgoing": false,\n' +
    '      "payment_type": "purchase",\n' +
    '      "amount": 0,\n' +
    '      "currency": "str",\n' +
    '      "net_amount": 0,\n' +
    '      "fee_amount": 0,\n' +
    '      "pending_amount": 0,\n' +
    '      "pending_unfreeze_on": 1619740800,\n' +
    '      "description": "string",\n' +
    '      "paid_on": 1619740800,\n' +
    '      "remote_paid_on": 1619740800\n' +
    '    },\n' +
    '    "issuer_details": {\n' +
    '      "website": "string",\n' +
    '      "legal_street_address": "string",\n' +
    '      "legal_country": "st",\n' +
    '      "legal_city": "string",\n' +
    '      "legal_zip_code": "string",\n' +
    '      "bank_accounts": [\n' +
    '        {\n' +
    '          "bank_account": "string",\n' +
    '          "bank_code": "string"\n' +
    '        }\n' +
    '      ],\n' +
    '      "legal_name": "string",\n' +
    '      "brand_name": "string",\n' +
    '      "registration_number": "string",\n' +
    '      "tax_number": "string"\n' +
    '    },\n' +
    '    "transaction_data": {\n' +
    '      "payment_method": "string",\n' +
    '      "extra": {},\n' +
    '      "country": "string",\n' +
    '      "attempts": [\n' +
    '        {\n' +
    '          "type": "execute",\n' +
    '          "successful": true,\n' +
    '          "payment_method": "string",\n' +
    '          "extra": {},\n' +
    '          "country": "string",\n' +
    '          "client_ip": "string",\n' +
    '          "processing_time": 1619740800,\n' +
    '          "error": {\n' +
    '            "code": "string",\n' +
    '            "message": "string"\n' +
    '          }\n' +
    '        }\n' +
    '      ]\n' +
    '    },\n' +
    '    "status": "created",\n' +
    '    "status_history": [\n' +
    '      {\n' +
    '        "status": "created",\n' +
    '        "timestamp": 1619740800,\n' +
    '        "related_object": {\n' +
    '          "type": "string",\n' +
    '          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"\n' +
    '        }\n' +
    '      }\n' +
    '    ],\n' +
    '    "viewed_on": 1619740800,\n' +
    '    "company_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "is_test": true,\n' +
    '    "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "brand_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "billing_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "client_id": null,\n' +
    '    "send_receipt": false,\n' +
    '    "is_recurring_token": true,\n' +
    '    "recurring_token": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '    "skip_capture": false,\n' +
    '    "force_recurring": false,\n' +
    '    "reference_generated": "string",\n' +
    '    "reference": "string",\n' +
    '    "issued": "2020-04-30",\n' +
    '    "due": 1619740800,\n' +
    '    "refund_availability": "all",\n' +
    '    "refundable_amount": 0,\n' +
    '    "currency_conversion": {\n' +
    '      "original_currency": "string",\n' +
    '      "original_amount": 0,\n' +
    '      "exchange_rate": 0\n' +
    '    },\n' +
    '    "payment_method_whitelist": [\n' +
    '      "string"\n' +
    '    ],\n' +
    '    "success_redirect": "string",\n' +
    '    "failure_redirect": "string",\n' +
    '    "cancel_redirect": "string",\n' +
    '    "success_callback": "string",\n' +
    '    "creator_agent": "string",\n' +
    '    "platform": "web",\n' +
    '    "product": "purchases",\n' +
    '    "created_from_ip": "string",\n' +
    '    "invoice_url": "string",\n' +
    '    "checkout_url": "string",\n' +
    '    "direct_post_url": "string",\n' +
    '    "marked_as_paid": true,\n' +
    '    "order_id": "string"\n' +
    '  }\n' +
    '}'


export const getBillingClients = '{\n' +
    '  "results": [\n' +
    '    {\n' +
    '      "type": "string",\n' +
    '      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "created_on": 1619740800,\n' +
    '      "updated_on": 1619740800,\n' +
    '      "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "status": "inactive",\n' +
    '      "subscription_billing_scheduled_on": "2020-04-30",\n' +
    '      "payment_method_whitelist": [\n' +
    '        "string"\n' +
    '      ]\n' +
    '    }\n' +
    '  ],\n' +
    '  "next": "string",\n' +
    '  "previous": "string"\n' +
    '}'

export const getBillingClientsById = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "status": "inactive",\n' +
    '  "subscription_billing_scheduled_on": "2020-04-30",\n' +
    '  "payment_method_whitelist": [\n' +
    '    "string"\n' +
    '  ]\n' +
    '}'

export const statusIsActive = '{\n' +
    '  "status": "active"\n' +
    '}'


export const postClients = '{\n' +
    '  "bank_account": "string",\n' +
    '  "bank_code": "string",\n' +
    '  "email": "user@example.com",\n' +
    '  "phone": "+44 45643564564",\n' +
    '  "full_name": "string",\n' +
    '  "personal_code": "string",\n' +
    '  "street_address": "string",\n' +
    '  "country": "st",\n' +
    '  "city": "string",\n' +
    '  "zip_code": "string",\n' +
    '  "shipping_street_address": "string",\n' +
    '  "shipping_country": "st",\n' +
    '  "shipping_city": "string",\n' +
    '  "shipping_zip_code": "string",\n' +
    '  "cc": [\n' +
    '    "user@example.com"\n' +
    '  ],\n' +
    '  "bcc": [\n' +
    '    "user@example.com"\n' +
    '  ],\n' +
    '  "legal_name": "string",\n' +
    '  "brand_name": "string",\n' +
    '  "registration_number": "string",\n' +
    '  "tax_number": "string"\n' +
    '}'

export const postClientsResp = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "bank_account": "string",\n' +
    '  "bank_code": "string",\n' +
    '  "email": "user@example.com",\n' +
    '  "phone": "+44 45643564564",\n' +
    '  "full_name": "string",\n' +
    '  "personal_code": "string",\n' +
    '  "street_address": "string",\n' +
    '  "country": "st",\n' +
    '  "city": "string",\n' +
    '  "zip_code": "string",\n' +
    '  "shipping_street_address": "string",\n' +
    '  "shipping_country": "st",\n' +
    '  "shipping_city": "string",\n' +
    '  "shipping_zip_code": "string",\n' +
    '  "cc": [\n' +
    '    "user@example.com"\n' +
    '  ],\n' +
    '  "bcc": [\n' +
    '    "user@example.com"\n' +
    '  ],\n' +
    '  "legal_name": "string",\n' +
    '  "brand_name": "string",\n' +
    '  "registration_number": "string",\n' +
    '  "tax_number": "string"\n' +
    '}'


export const getClients = '{\n' +
    '  "results": [\n' +
    '    {\n' +
    '      "type": "string",\n' +
    '      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "created_on": 1619740800,\n' +
    '      "updated_on": 1619740800,\n' +
    '      "bank_account": "string",\n' +
    '      "bank_code": "string",\n' +
    '      "email": "user@example.com",\n' +
    '      "phone": "+44 45643564564",\n' +
    '      "full_name": "string",\n' +
    '      "personal_code": "string",\n' +
    '      "street_address": "string",\n' +
    '      "country": "st",\n' +
    '      "city": "string",\n' +
    '      "zip_code": "string",\n' +
    '      "shipping_street_address": "string",\n' +
    '      "shipping_country": "st",\n' +
    '      "shipping_city": "string",\n' +
    '      "shipping_zip_code": "string",\n' +
    '      "cc": [\n' +
    '        "user@example.com"\n' +
    '      ],\n' +
    '      "bcc": [\n' +
    '        "user@example.com"\n' +
    '      ],\n' +
    '      "legal_name": "string",\n' +
    '      "brand_name": "string",\n' +
    '      "registration_number": "string",\n' +
    '      "tax_number": "string"\n' +
    '    }\n' +
    '  ],\n' +
    '  "next": "string",\n' +
    '  "previous": "string"\n' +
    '}'


export const getRecurringTokens = '{\n' +
    '  "results": [\n' +
    '    {\n' +
    '      "type": "string",\n' +
    '      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "created_on": 1619740800,\n' +
    '      "updated_on": 1619740800,\n' +
    '      "payment_method": "string",\n' +
    '      "description": "string"\n' +
    '    }\n' +
    '  ],\n' +
    '  "next": "string",\n' +
    '  "previous": "string"\n' +
    '}'


export const getRecurringTokensById = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "payment_method": "string",\n' +
    '  "description": "string"\n' +
    '}'


export const postWebhooks = '{\n' +
    '  "title": "string",\n' +
    '  "all_events": false,\n' +
    '  "events": [\n' +
    '    "purchase.created"\n' +
    '  ],\n' +
    '  "callback": "string"\n' +
    '}'

export const postWebhooksResp = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "title": "string",\n' +
    '  "all_events": false,\n' +
    '  "public_key": "-----BEGIN PUBLIC KEY-----\\nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA6gLlBKxCB5dxPJbinCzl\\nhOfKSgQtOWQQBxmnWIkEVUbqhpnqr3xNYi \n' +
    '   AvDyMUxYUwuzN44eHO+mR9MZWcSx3c\\nbXmKa3gsOzR6GdcOxMGaVxvfje+fujCAlCtO1BP+A9/FS3KcPgCYG1wtAPwA5IAf\\nHylL3TsUVIJQFBgiBr6N4Bgapr9eloaFfeYIBRsXmxPK \n' +
    '   AMJivqxYpLh0V3N4ZFd5\\nTGqSEAa4b1ULDr6p0sB2L3QikTdsF0zp03zNceKA6fXDOzD0xWtg9buXvyKwePK4\\nM2kcnWBNfsWghrdg0fG3O9bmkaS1oEXydrmJfuiI8h6a64J/1nzooi \n' +
    '   2yLC9D6Ta0\\nS63bbuAHymnQtiNuV7Ixp6IoTGFaS88aTiHaP8rdyWV8JTDFx0qeDzyaGWiYGwEF\\nmj/buHCEcRhoajbGkPhYA4YEdn4jy1wZhEr2OMdBPM7mPPI0Hy3hcNJVMVVlrpHe \n' +
    '   \\nIltQATpjlNaJMlRPjbcaiW7dsO3BuF9ZOMGksSOnyYm/AgMBAAE=\\n-----END PUBLIC KEY-----",\n' +
    '  "events": [\n' +
    '    "purchase.created"\n' +
    '  ],\n' +
    '  "callback": "string"\n' +
    '}'


export const getAllWebhooks = '{\n' +
    '  "results": [\n' +
    '    {\n' +
    '      "type": "string",\n' +
    '      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "created_on": 1619740800,\n' +
    '      "updated_on": 1619740800,\n' +
    '      "title": "string",\n' +
    '      "all_events": false,\n' +
    '      "public_key": "-----BEGIN PUBLIC KEY-----\\nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA6gLlBKxCB5dxPJbinCzl\\nhOfKSgQtOWQQBxmnWIkEVUbqhpn \n' +
    '       qr3xNYiAvDyMUxYUwuzN44eHO+mR9MZWcSx3c\\nbXmKa3gsOzR6GdcOxMGaVxvfje+fujCAlCtO1BP+A9/FS3KcPgCYG1wtAPwA5IAf\\nHylL3TsUVIJQFBgiBr6N4Bgapr9elo \n' +
    '       aFfeYIBRsXmxPKAMJivqxYpLh0V3N4ZFd5\\nTGqSEAa4b1ULDr6p0sB2L3QikTdsF0zp03zNceKA6fXDOzD0xWtg9buXvyKwePK4\\nM2kcnWBNfsWghrdg0fG3O9bmkaS1oEXyd \n' +
    '       rmJfuiI8h6a64J/1nzooi2yLC9D6Ta0\\nS63bbuAHymnQtiNuV7Ixp6IoTGFaS88aTiHaP8rdyWV8JTDFx0qeDzyaGWiYGwEF\\nmj/buHCEcRhoajbGkPhYA4YEdn4jy1wZhEr2 \n' +
    '       OMdBPM7mPPI0Hy3hcNJVMVVlrpHe\\nIltQATpjlNaJMlRPjbcaiW7dsO3BuF9ZOMGksSOnyYm/AgMBAAE=\\n-----END PUBLIC KEY-----",\n' +
    '      "events": [\n' +
    '        "purchase.created"\n' +
    '      ],\n' +
    '      "callback": "string"\n' +
    '    }\n' +
    '  ],\n' +
    '  "next": "string",\n' +
    '  "previous": "string"\n' +
    '}'


export const getWebhooksById = '{\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "title": "string",\n' +
    '  "all_events": false,\n' +
    '  "public_key": "-----BEGIN PUBLIC KEY-----\\nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA6gLlBKxCB5dxPJbinCzl\\nhOfKSgQtOWQQBxmnWIkEVUbqhpnqr3x \n' +
    '   NYiAvDyMUxYUwuzN44eHO+mR9MZWcSx3c\\nbXmKa3gsOzR6GdcOxMGaVxvfje+fujCAlCtO1BP+A9/FS3KcPgCYG1wtAPwA5IAf\\nHylL3TsUVIJQFBgiBr6N4Bgapr9eloaFfeYIBR \n' +
    '   sXmxPKAMJivqxYpLh0V3N4ZFd5\\nTGqSEAa4b1ULDr6p0sB2L3QikTdsF0zp03zNceKA6fXDOzD0xWtg9buXvyKwePK4\\nM2kcnWBNfsWghrdg0fG3O9bmkaS1oEXydrmJfuiI8h6a6 \n' +
    '   4J/1nzooi2yLC9D6Ta0\\nS63bbuAHymnQtiNuV7Ixp6IoTGFaS88aTiHaP8rdyWV8JTDFx0qeDzyaGWiYGwEF\\nmj/buHCEcRhoajbGkPhYA4YEdn4jy1wZhEr2OMdBPM7mPPI0Hy3h \n' +
    '   cNJVMVVlrpHe\\nIltQATpjlNaJMlRPjbcaiW7dsO3BuF9ZOMGksSOnyYm/AgMBAAE=\\n-----END PUBLIC KEY-----",\n' +
    '  "events": [\n' +
    '    "purchase.created"\n' +
    '  ],\n' +
    '  "callback": "string"\n' +
    '}'


export const putWebHooksById = '{\n' +
    '  "title": "string",\n' +
    '  "all_events": false,\n' +
    '  "events": [\n' +
    '    "purchase.created"\n' +
    '  ],\n' +
    '  "callback": "string"\n' +
    '}'


export const publickKey = '"-----BEGIN PUBLIC KEY-----\\nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA6gLlBKxCB5dxPJbinCzl\\\\nhOfKSgQtOWQQBxmnWIkEVUbqhpnqr3x \n' +
    ' NYiAvDyMUxYUwuzN44eHO+mR9MZWcSx3c\\\\nbXmKa3gsOzR6GdcOxMGaVxvfje+fujCAlCtO1BP+A9/FS3KcPgCYG1wtAPwA5IAf\\\\nHylL3TsUVIJQFBgiBr6N4Bgapr9eloaFfeYIBR \n' +
    ' sXmxPKAMJivqxYpLh0V3N4ZFd5\\\\nTGqSEAa4b1ULDr6p0sB2L3QikTdsF0zp03zNceKA6fXDOzD0xWtg9buXvyKwePK4\\\\nM2kcnWBNfsWghrdg0fG3O9bmkaS1oEXydrmJfuiI8h6a6 \n' +
    ' 4J/1nzooi2yLC9D6Ta0\\\\nS63bbuAHymnQtiNuV7Ixp6IoTGFaS88aTiHaP8rdyWV8JTDFx0qeDzyaGWiYGwEF\\\\nmj/buHCEcRhoajbGkPhYA4YEdn4jy1wZhEr2OMdBPM7mPPI0Hy3h \n' +
    ' cNJVMVVlrpHe\\\\nIltQATpjlNaJMlRPjbcaiW7dsO3BuF9ZOMGksSOnyYm/AgMBAAE=\\n-----END PUBLIC KEY-----"'


export const getCompanyBalance = '{\n' +
    '  "EUR": {\n' +
    '    "balance": 93408,\n' +
    '    "fee_sell": 0,\n' +
    '    "reserved": 0,\n' +
    '    "gross_balance": 93408,\n' +
    '    "pending_outgoing": 0,\n' +
    '    "available_balance": 93408\n' +
    '  },\n' +
    '  "RUB": {\n' +
    '    "balance": 1111840,\n' +
    '    "fee_sell": 360,\n' +
    '    "reserved": 0,\n' +
    '    "gross_balance": 1112200,\n' +
    '    "pending_outgoing": 0,\n' +
    '    "available_balance": 1111840\n' +
    '  },\n' +
    '  "USD": {\n' +
    '    "balance": -35420,\n' +
    '    "fee_sell": 1880,\n' +
    '    "reserved": 0,\n' +
    '    "gross_balance": -33540,\n' +
    '    "pending_outgoing": 0,\n' +
    '    "available_balance": -35420\n' +
    '  }\n' +
    '}'


export const getTurnover = '{\n' +
    '  "incoming": {\n' +
    '    "turnover": 93408,\n' +
    '    "fee_sell": 1750,\n' +
    '    "count": {\n' +
    '      "all": 175\n' +
    '    }\n' +
    '  },\n' +
    '  "outgoing": {\n' +
    '    "turnover": 93408,\n' +
    '    "fee_sell": 1750,\n' +
    '    "count": {\n' +
    '      "all": 175\n' +
    '    }\n' +
    '  }\n' +
    '}'


export const postCompanyStatements = '{\n' +
    '  "format": "csv",\n' +
    '  "timezone": "UTC"\n' +
    '}'


export const postCompanyStatementsResponse = '{\n' +
    '  "format": "string",\n' +
    '  "timezone": "Europe/Oslo",\n' +
    '  "is_test": true,\n' +
    '  "company_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '  "query_string": "string",\n' +
    '  "status": "string",\n' +
    '  "download_url": "string",\n' +
    '  "began_on": 1619740800,\n' +
    '  "finished_on": 1619740800,\n' +
    '  "created_on": 1619740800,\n' +
    '  "updated_on": 1619740800,\n' +
    '  "type": "string",\n' +
    '  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"\n' +
    '}'


export const getCompanyStatements = '{\n' +
    '  "results": [\n' +
    '    {\n' +
    '      "format": "string",\n' +
    '      "timezone": "Europe/Oslo",\n' +
    '      "is_test": true,\n' +
    '      "company_uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n' +
    '      "query_string": "string",\n' +
    '      "status": "string",\n' +
    '      "download_url": "string",\n' +
    '      "began_on": 1619740800,\n' +
    '      "finished_on": 1619740800,\n' +
    '      "created_on": 1619740800,\n' +
    '      "updated_on": 1619740800,\n' +
    '      "type": "string",\n' +
    '      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"\n' +
    '    }\n' +
    '  ],\n' +
    '  "next": "string",\n' +
    '  "previous": "string"\n' +
    '}'

export const responseP2PMethods = '{\n' +
    ' “success” : "boolean",\n' +
    ' “methods” :  [],\n' +
    ' "apiKey": "string",\n' +
    '}'

export const bodyP2Pcreate = '{ \n' +
    '   "apiKey": "1234fhjj", \n' +
    '   "methodId": "qweerttygfd1234", \n' +
    '   "amount": "4240", \n' +
    '   "name": "Иван Иванович Иванов", \n' +
    '}'
export const responseP2Pcreate = '{\n' +
    ' "amount" : "number",\n' +
    ' "card" :  "string",\n' +
    ' "methodId" : "string", \n' +
    ' "paymentId" : "string", \n' +
    ' "apiKey" : "string",\n' +
    ' "methodName" : "string",\n' +
    ' "fiatName" : "string",\n' +
    ' "timeout" : "timestamp",\n' +
    '}'
export const bodyP2Papprove = '{ \n' +
    '   "apiKey": "1234fghj", \n' +
    '   "paymentId": "qwerty1234", \n' +
    '}'
export const responseP2Papprove = '{\n' +
    ' "success" : "boolean",\n' +
    ' "message" :  "string",\n' +
    ' "apiKey": "string",\n' +
    '}'
export const responseP2Pcheck = '{\n' +
    ' "success" : "boolean",\n' +
    ' "message" :  "string",\n' +
    ' "apiKey": "string",\n' +
    ' "paymentStatus": "string",\n' +
    '}'
