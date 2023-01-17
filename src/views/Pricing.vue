<template>
  <div id="paypal-button-container"></div>
</template>
<script>


export default {
  mounted() {
    paypal.Buttons({
      style: {
        color: 'gold',
        shape: 'pill',
        layout: 'horizontal',
      },
      createOrder: (data, actions) => {
        const createOrderPayload = {
          purchase_units: [
            {
              amount: {
                value: '4000.0',
              },
            },
          ],
        };
        return actions.order.create(createOrderPayload);
      },
      onApprove: (data, actions) => {
        const captureOrderHandler = (details) => {
          const payerName = details.payer.name.given_name;
          console.log('Transaction completed');
        };
        return actions.order.capture().then(captureOrderHandler);
      },
      onError: (err) => {
        console.error('An error prevented the buyer from checking out with PayPal');
      },
    }).render('#paypal-button-container');
  },
};
</script>