import React from "react";
import emptyImage from "/src/assets/empty.png";
import { Link } from "react-router-dom";
function EmptyList() {
  return (
    <section className='empty-list'>
      <img src={emptyImage} alt='' />
      <h2>Store is Empty</h2>
      <p>
        Don't worry, we will soon stock up. But in the mean time, check out our
        other services such as VTU and Bills
      </p>
      <Link>Back to Home</Link>
    </section>
  );
}

export default EmptyList;
