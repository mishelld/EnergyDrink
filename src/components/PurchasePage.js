import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PurchasePage.css";
import "font-awesome/css/font-awesome.min.css";
import { CheckCircle } from "lucide-react"; // Using Lucide for the checkmark icon
import { cartUrl } from "../utils/constants"; // Adjust path from components to utils

function PurchasePage({ setCart, setCartItemCount }) {
  const [cart, setCartState] = useState([]); // Local state for cart
  const [selectedOption, setSelectedOption] = useState("takeout");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartUrlEmail = `${cartUrl}/${userEmail}`;
  const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch cart details when component mounts
    const fetchCart = async () => {
      try {
        const response = await fetch(cartUrlEmail);
        if (response.ok) {
          const cartData = await response.json();
          setCartState(cartData); // Set the cart data into state
          setCart(cartData); // Optionally update the parent component's cart

          if (cartData.length > 0) {
            setSelectedCity(cartData[0].location || ""); // Use first item's location
            setSelectedOption(cartData[0].serviceType || ""); // Use first item's serviceType
          }
        } else {
          console.error("Failed to fetch cart");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userEmail) {
      fetchCart(); // Only fetch if the user is logged in
    }
  }, [userEmail, setCart]);

  const handleOptionChange = async (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    try {
      const response = await fetch(`${cartUrlEmail}/update-details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceType: newOption }),
      });

      if (!response.ok) {
        throw new Error("Failed to update service type on the server");
      }
    } catch (error) {
      console.error("Error updating service type:", error);
    }
  };

  const handleCityChange = async (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);

    try {
      const response = await fetch(`${cartUrlEmail}/update-details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: newCity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update city on the server");
      }
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const increaseQuantity = async (index, itemId) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;

    try {
      const response = await fetch(`${cartUrlEmail}/item/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: updatedCart[index].quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity on server");
      }

      // Update the local state after successful update on the server
      setCartState(updatedCart);
      setCart(updatedCart); // Update the parent cart as well
      fetchCount(userEmail, setCartItemCount);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const decreaseQuantity = async (index, itemId) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;

      try {
        const response = await fetch(`${cartUrlEmail}/item/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: updatedCart[index].quantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update item quantity on server");
        }

        // Update the local state after successful update on the server
        setCartState(updatedCart);
        setCart(updatedCart); // Update the parent cart as well
        fetchCount(userEmail, setCartItemCount);
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    } else {
      // Quantity is 0, so we need to delete it from the server
      deleteItem(index, itemId);
    }
  };

  const deleteItem = async (index, itemId) => {
    try {
      // Call the DELETE API to remove the item from the cart on the server
      const response = await fetch(`${cartUrlEmail}/item/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      // Update the local state after successful deletion
      const updatedCart = cart.filter((_, i) => i !== index);
      setCartState(updatedCart);
      setCart(updatedCart); // Update the parent cart as well
      fetchCount(userEmail, setCartItemCount);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const fetchCount = async (userEmail, setCartItemCount) => {
    if (!userEmail) return;
    try {
      const response = await fetch(cartUrlEmail);
      if (response.ok) {
        const cartData = await response.json();
        const totalItems = cartData.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setCartItemCount(totalItems); // Update cart count in Navbar
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const totalPrice = cart
    .reduce(
      (total, item) =>
        total + (parseFloat(item.price) || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  const handlePurchase = async () => {
    if (!userEmail || cart.length === 0) {
      alert("Your cart is empty or you are not logged in.");
      return;
    }

    try {
      const response = await fetch(`${cartUrl}/checkout/${userEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally, update the UI (clear cart, navigate to orders page, etc.)
        setCart([]);
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleProceedToCheckout = async () => {
    setIsLoading(true);
    setIsSuccess(false);

    await handlePurchase();
    await fetchCount(userEmail, setCartItemCount);

    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      navigate("/checkout");
    }, 1000); // Delay before navigation
  };

  return (
    <div className="purchase-page">
      {/* Left Side: Takeout or Here picker */}
      <div className="left-side">
        <label>Select the location</label>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          <option value="tel_aviv">Tel Aviv</option>
          <option value="beer_sheva">Beer Sheva</option>
          <option value="jerusalem">Jerusalem</option>
          <option value="haifa">Haifa</option>
        </select>
        <label>Select the service type</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="takeout">Takeout</option>
          <option value="here">Here</option>
        </select>
      </div>

      {/* Right Side: Items container */}
      <div className="right-side-wrapper">
        <div className="right-side">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="item-container">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <div className="item-name">{item.title}</div>
                    <div className="item-price">${item.price}</div>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(index, item._id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(index, item._id)}>
                        +
                      </button>
                    </div>
                  </div>
                  {/* Trash can button */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(index, item._id)}
                  >
                    <i className="fa fa-trash"></i>{" "}
                    {/* Font Awesome trash icon */}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Total Section */}
          <div className="total-container">
            <div className="total-price">Total: ${totalPrice}</div>
          </div>

          {/* Proceed Button */}
          <div className="proceed-btn-container">
            <button
              className={`proceed-btn ${isSuccess ? "success" : ""}`}
              onClick={handleProceedToCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : isSuccess ? (
                <CheckCircle className="check-icon" />
              ) : (
                "Proceed to Checkout"
              )}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
