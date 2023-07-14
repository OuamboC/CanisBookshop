window.onload = () => {
  const menu_btn = document.querySelector(".hamburger");
    const mobile_menu = document.querySelector(".mobile-nav");
    const main_nav = document.querySelector(".main-nav");

    // Add a click event listener to the hamburger button
    menu_btn.addEventListener("click", function () {
        // Toggle the is-active class on the hamburger button
        menu_btn.classList.toggle("is-active");
        // Toggle the is-active class on the mobile nav element
        mobile_menu.classList.toggle("is-active");
        // Toggle the hidden class on the main nav element
        main_nav.classList.toggle("hidden");
    });

     
    
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
          alert("Payment details are valid!");
          
        }
      });
      
      function validateForm() {
        const cardNumber = document.getElementById("CardNumber").value;
        const expMonth = document.getElementById("exp-month").value;
        const expYear = document.getElementById("exp-year").value;
        const securityCode = document.getElementById("SecurityCode").value;
         
      
        if (!isValidCardNumber(cardNumber)) {
          alert("Invalid Card Number: It should be a 16-digit Mastercard number starting with 51, 52, 53, 54, or 55.");
          return false;
        }
      
        if (!isValidExpiryDate(expMonth, expYear)) {
          alert("Invalid Expiry Date: The card has expired.");
          return false;
        }
      
        if (!isValidSecurityCode(securityCode)) {
          alert("Invalid Security Code: It should be a 3 or 4-digit number.");
          return false;
        }
        sendPaymentDetails(cardNumber,expMonth,expYear,securityCode);
      
        return true;
      }
      
      function isValidCardNumber(cardNumber) {
        return /^(?:5[1-5]\d{14})$/.test(cardNumber);
      }
      
      function isValidExpiryDate(month, year) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();
      
        return !(year < currentYear || (year == currentYear && month < currentMonth));
      }
      
      function isValidSecurityCode(securityCode) {
        return /^\d{3,4}$/.test(securityCode);
      }
      
      // Function to send a POST request using Fetch API to process payment
      async function sendPaymentDetails(cardNumber,expMonth,expYear,securityCode) {
        try {
          // Send the POST request to the server using fetch API
          const response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {

            method: "POST", // Define the request type as POST
            headers: {
              "Content-Type": "application/json" // Set the content type for the request
            },

            body: JSON.stringify({
              "master_card": cardNumber, // Use the cardNumber constant
              "exp_year": expYear, // Use the expYear constant
              "exp_month": expMonth, // Use the expMonth constant
              "cvv_code": securityCode // Use the securityCode constant
            })
          });
      
          
            // Check if the response status is OK (200)
            if (response.ok) {
              // Parse the JSON response
              const data = await response.json();
              
              // Log the received data to the console
              console.log(data);
              
              // Get the last four digits of the card number
              const ShowlastFourDigits = cardNumber.slice(-4);
          
              // Redirect the user to the success page with the last four digits of the card number as a query parameter
              window.location.href = "success.html?=" + ShowlastFourDigits;
          
              // Alert the user that their payment was successful
              alert("Thank you for your payment");
            } else {
              // If the response status is not OK, handle different status codes using if...else if...else statements
              if (response.status == 400) {
                // Handle 400 Bad Request
                throw new Error("Bad request! Please check your cardNumber,ExpiryDate,securityCode.");
              } else if (response.status == 401) {
                // Handle 401 Unauthorized
                throw new Error("Unauthorized! Please ensure you have permission to make this payment.");
              } else if (response.status == 403) {
                // Handle 403 Forbidden
                throw new Error("Forbidden! You don't have permission to access this resource.");
              } else if (response.status == 404) {
                // Handle 404 Not Found
                throw new Error("Not found! The requested resource could not be found.");
              } else if (response.status == 500) {
                // Handle 500 Internal Server Error
                throw new Error("Internal server error! We are unable to process your payment at this time. Please try again later.");
              } else {
                // Handle other status codes
                throw new Error("Payment details are not valid! Please try again.");
              }
            }
          } catch (error) {
            // Catch and handle any errors that occurred during the fetch request or processing the response
            // Log the error details to the console
            console.error(error);
            
            // Alert the user with the error message
            alert(error.message);
          }
          
        }    
       
}
          

     
      
 
  
     


