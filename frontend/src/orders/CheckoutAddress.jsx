import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addAddressInfo, getAddressInfo } from "./services";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData } from "../slices/cartApiSlice";
export const CheckoutAddress = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState();
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addressValue, setAddressValue] = useState("");
  const [townValue, setTownValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [pincodeValue, setPincodeValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addNewAddressHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newAddress = {
      address: addressValue,
      Town: townValue,
      city: cityValue,
      state: stateValue,
      pinCode: pincodeValue,
    };

    try {
      const data = await addAddressInfo({ address: newAddress });
      console.log(data);
      setaddNewAddress((prev) => !prev);
    } catch (error) {}
    setAddressValue("");
    setTownValue("");
    setCityValue("");
    setStateValue("");
    setPincodeValue("");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "address":
        setAddressValue(value);
        break;
      case "town":
        setTownValue(value);
        break;
      case "city":
        setCityValue(value);
        break;
      case "state":
        setStateValue(value);
        break;
      case "pincode":
        setPincodeValue(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(22);
    const fetchCartItems = async () => {
      dispatch(fetchCartData())
        .then((response) => {
          if (response.payload.cartItems) {
            setCartItems(response.payload.cartItems);
            setTotalPrice(response.payload.total);
          }
        })
        .catch((error) => {
          console.error("Cart items not available", error);
          setCartItems([]);
        })
        .finally(() => {});
    };
    const fetchAddress = async () => {
      try {
        const data = await getAddressInfo();
        setAddress(data);
      } catch (error) {}
    };
    fetchAddress();
    fetchCartItems();
  }, []);

  if (addNewAddress) {
    return (
      <div
        className="top-0 left-0 w-screen z-50 fixed h-screen bg-white flex justify-center p-10"
        id="modal"
      >
        <form
          className="w-1/3 h-full bg-gray-100 flex flex-col py-5 px-3 rounded-2xl items-end"
          onSubmit={addNewAddressHandler}
        >
          <div className="w-full flex flex-row-reverse justify-between">
            <button
              type="button"
              onClick={() => setaddNewAddress((prev) => !prev)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5"
            >
              Close
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5"
            >
              Add address
            </button>
          </div>
          <div className="w-full">
            <label
              htmlFor="address"
              className="p-2.5 block text-sm font-medium text-gray-900 "
            >
              {" "}
              Address{" "}
            </label>
            <input
              type="text"
              id="address"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter your address"
              required
              name="address" // Use name attribute htmlFor state management
              value={addressValue} // Set value from state
              onChange={handleChange} // Update state on change
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="town"
              className="p-2.5 block text-sm font-medium text-gray-900 "
            >
              {" "}
              Town{" "}
            </label>
            <input
              type="text"
              id="town"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter your Town name"
              required
              name="town"
              value={townValue}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="city"
              className="p-2.5 block text-sm font-medium text-gray-900 "
            >
              {" "}
              City{" "}
            </label>
            <input
              type="text"
              id="city"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter your city name"
              required
              name="city"
              value={cityValue}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="state"
              className="p-2.5 block text-sm font-medium text-gray-900 "
            >
              {" "}
              State{" "}
            </label>
            <input
              type="text"
              id="state"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter your state name"
              required
              name="state"
              value={stateValue}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="pincode"
              className="p-2.5 block text-sm font-medium text-gray-900 "
            >
              {" "}
              Pincode{" "}
            </label>
            <input
              type="text"
              id="pincode"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter your pincode"
              required
              name="pincode"
              value={pincodeValue}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex p-10 gap-4">
      <div className="w-1/2 h-full">
        <div className="w-full h-2/3">
          <div className="max-w-4xl mx-auto w-full h-max rounded-md p-4 sticky top-0">
            <h2 className="text-xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="w-full flex gap-2">
                  <div className="w-1/2 ">
                    <div className="flex flex-col gap-1 h-44 overflow-scroll w-full pr-2">
                      {address &&
                        address.shippingAddress.map((item, index) => (
                          <div
                            className="rounded-xl text-sm  p-2 border flex gap-2"
                            key={item._id}
                          >
                            <input type="radio" name="address" />
                            {item.address} {item.city} {item.state}
                            {" ~ "}
                            {item.pinCode}
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => setaddNewAddress((prev) => !prev)}
                      className="text-sm mt-2 text-orange-500 text-left lowercase opacity-60 hover:opacity-95 px-2 py-1 border-2 w-fit rounded-md"
                    >
                      Add New Address
                    </button>
                  </div>
                  <div className=" w-1/2 p-2 flex flex-col items-end divide-gray-200 h-1/2 border rounded-2xl">
                    <dl className="flex items-center justify-between gap-4 py-1 w-full border-b">
                      <dt className="text-base font-normal text-gray-500 ">
                        Subtotal
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        &#8377; {totalPrice.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-1 w-full border-b">
                      <dt className="text-base font-normal text-gray-500 ">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        &#8377;99
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-1 w-full border-b-2">
                      <dt className="text-base font-bold text-gray-900 ">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 ">
                        &#8377; {parseFloat(totalPrice.toFixed(2)) + 99}
                      </dd>
                    </dl>
                    <button className="text-sm bg-orange-500 text-white capitalize text-left mt-2 hover:opacity-75 px-2 py-1 border-2 w-fit rounded-md">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto w-1/2 flex-none lg:max-w-2xl xl:max-w-4xl h-screen">
        <div className="space-y-6 h-[90%] overflow-y-scroll">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                key={index}
              >
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <img
                    className="h-32 w-24 rounded-lg"
                    src={item.image}
                    alt=""
                  />

                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex flex-col gap-4 items-center w-full h-full">
                      <div className="flex items-center">
                        <p className="w-20 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 ">
                          X {item.quantity}
                        </p>
                      </div>
                      <h4>&#8377;{item.price}</h4>
                    </div>

                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 "></p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link
                      to={`/categories/men/singleProduct?id=${item._id}`}
                      className="text-base  text-gray-900 hover:opacity-75 border-b border-black"
                    >
                      {item.name}
                    </Link>
                    <p>Size : {item.attributes.size}</p>
                    <p className="text-sm opacity-65">{item.description}</p>
                    <div className="flex items-center gap-4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" w-full h-full relative -left-28">Empty cart</div>
          )}
        </div>
      </div>
    </div>
  );
};
