const button = document.getElementById("pagar");
const response = document.getElementById("mensaje");

const metodosPago = [
  {
    supportedMethods: "https://bobbucks.dev/pay"
  },
  {
    supportedMethods: "https://google.com/pay",
    data: {
      environment: "TEST",
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        merchantId: '1234567890',
        merchantName: "Example Merchant"
      },
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: [
              "AMEX",
              "DISCOVER",
              "INTERAC",
              "JCB",
              "MASTERCARD",
              "MIR",
              "VISA"
            ]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId"
            }
          }
        }
      ]
    }
  }
];

const detallesPago = {
  id: "pago-001",
  displayItems: [
    {
      label: "Comprar este producto",
      amount: { currency: "USD", value: "20.00" }
    }
  ],
  total: {
    label: "Total",
    amount: { currency: "USD", value: "20.00" }
  }
};

const opcionesPago = {
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: true,
  shippingType: "shipping"
};

const solicitud = new PaymentRequest(
  metodosPago,
  detallesPago,
  opcionesPago
);

button.addEventListener("click", () => {
  solicitud.show().then((paymentResponse) => {
    console.log(paymentResponse);
    paymentResponse
      .complete("success")
      .then(() => {
        response.innerText = "Gracias por tu compra !";
      })
      .catch(function (error) {
        response.innerText = "Perdón, algo salió mal.";
      });
  });
});