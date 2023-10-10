const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51NwmsiIMr3rp9BogLYTPnnBbObnlEuBWJnlB2VDBKFUSqkHdlJQfHFbsL30A2VlMVoLMn7JKHvzdsKe0v377HpDw00ezLRNlfn'
);

// router endpoints
router.post('/intents', async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents, mxn -> cents
      currency: 'mxn',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;