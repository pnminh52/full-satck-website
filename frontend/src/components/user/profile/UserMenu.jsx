import { Link } from "react-router-dom";

const UserMenu = ({ handdleLogOut }) => {
  const buttons = [
    { label: "Wishlist", icon: "https://www.goodsmile.com/img/icon/like-transparent.svg", link: "/wishlist" },
    { label: "Order History", icon: "https://www.goodsmile.com/img/icon/history.svg", link:"/order" },
    { label: "Shipping Address", icon: "https://www.goodsmile.com/img/icon/address.svg", link:"/shipping" },
    { label: "Coupons", icon: "https://www.goodsmile.com/img/icon/coupon.svg" , link:"/coupon" },
    { label: "Logout", icon: "https://www.goodsmile.com/img/icon/logout.svg", onClick: handdleLogOut },
  
];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4  ">
      {buttons.map((btn, idx) => (
       
          <Link
            to={btn.link}
            key={idx}
            className="flex border-b border-gray-400 items-center justify-between gap-2 px-4 py-3 hover:bg-gray-100"
          >
           <div className="flex items-center gap-2">
           <img src={btn.icon} alt={btn.label} className="w-5 h-5" />
           {btn.label}
           </div>
            <img src="https://www.goodsmile.com/img/icon/arrow-paging.svg" alt="" />
          </Link>
      
      ))}
    </div>
  );
};

export default UserMenu;
