import React from 'react';

const Cart = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">YOUR <span className="text-gray-700 font-medium">CART</span></p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl mb-3">
            <div className="inline-flex gap-2 items-center">
              <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between py-2">
              <p>Subtotal</p>
              <p>$0.00</p>
            </div>
            <hr />
            <div className="flex justify-between py-2">
              <p>Shipping Fee</p>
              <p>$10.00</p>
            </div>
            <hr />
            <div className="flex justify-between py-2 font-bold">
              <p>Total</p>
              <p>$10.00</p>
            </div>
          </div>

          <div className="w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3 rounded-md transition duration-300 hover:bg-gray-700">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
