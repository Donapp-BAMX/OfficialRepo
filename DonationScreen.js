import React from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function redirectToLinkPay() {
    window.location.href = 'https://donate.stripe.com/test_fZedUQ8QE4LG49ybII';
}

function redirectToForm() {
  history.push('/DonateMedicine');
}

function Donation() {
  return (
    <div>
      <button onClick={redirectToLinkPay}>Redirigir a un enlace</button>
      <button onClick={redirectToForm}>Redirigir a otra vista</button>
    </div>
  );
}

export default Donation;