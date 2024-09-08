import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Kpay from '../assets/KBZ.png';
import Visa from '../assets/visalogo.jpg';
import Wave from '../assets/Wave.jpg';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showToast, setShowToast] = useState(false); 
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalPrice(total);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      setShowEmptyCartPopup(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPaymentMethod(null);
    setErrors({}); // Clear errors when closing
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
    setErrors({}); // Reset errors on payment method change
  };

  const handleCardNumberChange = (e) => {
    let inputVal = e.target.value.replace(/\D/g, '');
    if (inputVal.length > 16) inputVal = inputVal.slice(0, 16);
    const formattedCardNumber = inputVal.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    let inputVal = e.target.value.replace(/\D/g, '');
    if (inputVal.length > 6) inputVal = inputVal.slice(0, 6);
    let month = inputVal.slice(0, 2);
    let year = inputVal.slice(2);
    if (month.length === 1 && parseInt(month, 10) > 1) {
      month = '0' + month;
    } else if (month.length === 2 && parseInt(month, 10) > 12) {
      month = '12';
    }
    setExpiryDate(inputVal.length > 2 ? `${month}/${year}` : month);
  };

  const handlePhoneNumberChange = (e) => {
    const inputVal = e.target.value.replace(/\D/g, '');
    setPhoneNumber(inputVal);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const isFormValid = () => {
    if (selectedPaymentMethod === 'Kpay' || selectedPaymentMethod === 'Wave') {
      return phoneNumber !== '';
    }
    if (selectedPaymentMethod === 'Visa') {
      return cardNumber !== '' && expiryDate !== '' && cvv !== '';
    }
    return false;
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedPaymentMethod === 'Kpay' || selectedPaymentMethod === 'Wave') {
      if (!phoneNumber) {
        newErrors.phoneNumber = 'You need to fill this form';
      }
    }
    if (selectedPaymentMethod === 'Visa') {
      if (!cardNumber) newErrors.cardNumber = 'You need to fill this form';
      if (!expiryDate) newErrors.expiryDate = 'You need to fill this form';
      if (!cvv) newErrors.cvv = 'You need to fill this form';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBuyNow = () => {
    if (validateForm()) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setShowPaymentModal(false);
      setSelectedPaymentMethod(null);
    }
  };

  const handleOk = () => {
    setShowEmptyCartPopup(false);
  };

  const handleGoToShop = () => {
    setShowEmptyCartPopup(false);
    navigate('/shop');
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      {/* Cart Items Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-teal-100 text-left rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((book, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">Total Price:</span>
        <span className="text-xl font-bold">Ks.{totalPrice.toFixed(2)}</span>
      </div>

      {/* Purchase Button */}
      <div className="mt-4">
        <button
          onClick={handlePurchase}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Purchase
        </button>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600 bg-white rounded w-8 h-8 flex items-center justify-center text-xl hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">Select Payment Method</h2>

              <div className="flex justify-around mb-4">
                <img
                  src={Kpay}
                  alt="K-pay"
                  className={`h-12 cursor-pointer ${selectedPaymentMethod === 'Kpay' ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('Kpay')}
                />
                <img
                  src={Wave}
                  alt="Wave-pay"
                  className={`h-12 cursor-pointer ${selectedPaymentMethod === 'Wave' ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('Wave')}
                />
                <img
                  src={Visa}
                  alt="VISA"
                  className={`h-12 cursor-pointer ${selectedPaymentMethod === 'Visa' ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('Visa')}
                />
              </div>

              <div className="mt-4">
                {selectedPaymentMethod === 'Kpay' || selectedPaymentMethod === 'Wave' ? (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder='Enter your phone number'
                    />
                    {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
                  </div>
                ) : selectedPaymentMethod === 'Visa' && (
                  <div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Enter your card number'
                      />
                      {errors.cardNumber && <div className="text-red-500 text-sm">{errors.cardNumber}</div>}
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='MM/YYYY'
                      />
                      {errors.expiryDate && <div className="text-red-500 text-sm">{errors.expiryDate}</div>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Enter CVV'
                      />
                      {errors.cvv && <div className="text-red-500 text-sm">{errors.cvv}</div>}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleBuyNow}
                  className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty Cart Popup */}
        {showEmptyCartPopup && (
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black p-6 rounded shadow-lg">
            <div className="text-black mb-4">There are no items in the cart.</div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleOk}
                className="text-black px-4 py-2 mt-4 border border-black rounded hover:bg-gray-200"
                
              >
                Ok
              </button>
              <button
                onClick={handleGoToShop}
                className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700"
              >
                Go to Shop
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-black text-white p-3 rounded shadow-lg transition-opacity duration-300 opacity-100">
            <div>Item purchased successfully!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
