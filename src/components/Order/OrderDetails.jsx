import { useParams } from "react-router-dom";
import Tshirt from "../../assets/Tshirt.png"

const OrderDetails = () => {
    const order= [
        {
          "orderId": "5302002",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 2,
          "orderDate": "Jan 10, 2020",
          "price": "$253.82",
          "status": "Completed"
        },
        {
          "orderId": "5302003",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 1,
          "orderDate": "Sep 4, 2020",
          "price": "$556.24",
          "status": "Completed"
        },
        {
          "orderId": "5302004",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 3,
          "orderDate": "Aug 30, 2020",
          "price": "$115.26",
          "status": "Completed"
        },
        {
          "orderId": "5302005",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 3,
          "orderDate": "Aug 29, 2020",
          "price": "$675.51",
          "status": "Completed"
        },
        {
          "orderId": "5302006",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 4,
          "orderDate": "Dec 26, 2020",
          "price": "$910.71",
          "status": "Completed"
        },
        {
          "orderId": "5302007",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 2,
          "orderDate": "Apr 27, 2020",
          "price": "$897.90",
          "status": "Completed"
        },
        {
          "orderId": "5302008",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 1,
          "orderDate": "May 5, 2020",
          "price": "$563.43",
          "status": "Pending"
        },
        {
          "orderId": "5302009",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 4,
          "orderDate": "Oct 15, 2020",
          "price": "$883.96",
          "status": "Rejected"
        },
        {
          "orderId": "5302010",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 3,
          "orderDate": "Jul 12, 2020",
          "price": "$162.15",
          "status": "Pending"
        },
        {
          "orderId": "5302011",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 2,
          "orderDate": "Jun 28, 2020",
          "price": "$378.34",
          "status": "Completed"
        },
        {
          "orderId": "5302012",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 1,
          "orderDate": "Nov 5, 2020",
          "price": "$245.19",
          "status": "Pending"
        },
        {
          "orderId": "5302013",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 5,
          "orderDate": "Mar 14, 2020",
          "price": "$794.55",
          "status": "Completed"
        },
        {
          "orderId": "5302014",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 3,
          "orderDate": "Jan 30, 2020",
          "price": "$322.14",
          "status": "Completed"
        },
        {
          "orderId": "5302015",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 2,
          "orderDate": "Sep 9, 2020",
          "price": "$501.27",
          "status": "Rejected"
        },
        {
          "orderId": "5302016",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 1,
          "orderDate": "May 25, 2020",
          "price": "$137.69",
          "status": "Completed"
        },
        {
          "orderId": "5302017",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 4,
          "orderDate": "Dec 18, 2020",
          "price": "$862.92",
          "status": "Pending"
        },
        {
          "orderId": "5302018",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 2,
          "orderDate": "Aug 11, 2020",
          "price": "$472.20",
          "status": "Completed"
        },
        {
          "orderId": "5302019",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 3,
          "orderDate": "Feb 22, 2020",
          "price": "$689.18",
          "status": "Pending"
        },
        {
          "orderId": "5302020",
          "product": "Basket with handles",
          "category": "Grocery",
          "quantity": 1,
          "orderDate": "Jul 1, 2020",
          "price": "$230.78",
          "status": "Completed"
        }
      ]
    const { id } = useParams();
// use this when implementation phase begun
    const singleOrder = order.find((order) => order.orderId === parseInt(id));
    return (
        <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-teal-500 mb-8">Order Details</h1>
  
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Order information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Product ID</p>
              <p className="text-gray-700">5302002</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Name</p>
              <p className="text-gray-700">Jon Miya</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Location</p>
              <p className="text-gray-700">Dubai</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Price</p>
              <p className="text-gray-700">$20.24</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Product category</p>
              <p className="text-gray-700">Man Tee Shirt</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Items</p>
              <p className="text-gray-700">1</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Delivery Date</p>
              <p className="text-gray-700">13/4/25</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Order Status</p>
              <p className="text-gray-700">Completed</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Payment Method</p>
              <p className="text-gray-700">Credit Card</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Payment Status</p>
              <p className="text-gray-700">Paid</p>
            </div>
          </div>
  
          {/* Middle column - Product image */}
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-2 w-fit h-[150px]">
              <img
                src={Tshirt}
                alt="Product Image"
              
                className="object-cover "
              />
            </div>
          </div>
  
          {/* Right column - Shipping details */}
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-4">Shipping Details</h2>
  
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping ID</p>
                <p className="text-gray-700">5302002</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipped Date</p>
                <p className="text-gray-700">20-22-2025</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping Status</p>
                <p className="text-gray-700">Pending</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping Method</p>
                <p className="text-gray-700">Express</p>
              </div>
  
              <div className="mt-8"></div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Opening Stock</p>
                <p className="text-gray-700">40</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Remaining Stock</p>
                <p className="text-gray-700">34</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">On the way</p>
                <p className="text-gray-700">15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default OrderDetails;