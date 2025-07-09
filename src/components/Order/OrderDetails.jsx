import { useParams } from "react-router-dom";
import { useSingleOrderQuery } from "../../redux/features/order/orderApi";
import { currencyFormatter } from "../../utils/currencyFormatter";

const OrderDetails = () => {

    const { id } = useParams();
    
    const {data:singleOrder}=useSingleOrderQuery(id)
    console.log("Single Order------->",singleOrder?.data);
const order = singleOrder?.data
const isoDate =order?.deliveryDate
const date = new Date(isoDate);

// get date parts
const day = date.getUTCDate();
const month = date.getUTCMonth() + 1; // 0-based index
const year = date.getUTCFullYear();

const formattedDate = `${day}/${month}/${year}`;

// use this when implementation phase begun
    // const singleOrder = order.find((order) => order.orderId === parseInt(id));
    return (
        <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-teal-500 mb-8">Order Details</h1>
  
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Order information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Product ID</p>
              <p className="text-gray-700">--------</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Name</p>
              <p className="text-gray-700">------</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Location</p>
              <p className="text-gray-700">------</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Price</p>
              <p className="text-gray-700">{currencyFormatter(order?.price)}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Product category</p>
              <p className="text-gray-700">-------</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Items</p>
              <p className="text-gray-700">{order?.quantity}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Delivery Date</p>
              <p className="text-gray-700">{formattedDate}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Order Status</p>
              <p className="text-gray-700">{order?.status}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Payment Method</p>
              <p className="text-gray-700">--------</p>
            </div>
  
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Payment Status</p>
              <p className="text-gray-700">{order?.paymentStatus}</p>
            </div>
          </div>
  
          {/* Middle column - Product image */}
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-2 w-fit h-[150px]">
              <img
                src={order?.designFiles[0]}
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
                <p className="text-gray-700">--------</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipped Date</p>
                <p className="text-gray-700">{formattedDate}</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping Status</p>
                <p className="text-gray-700">{order?.status}</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping Method</p>
                <p className="text-gray-700">{order?.deliveryOption}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Shipping Address</p>
                <p className="text-gray-700">{order?.shippingAddress}</p>
              </div>
  
              {/* <div className="mt-8"></div>
  
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default OrderDetails;