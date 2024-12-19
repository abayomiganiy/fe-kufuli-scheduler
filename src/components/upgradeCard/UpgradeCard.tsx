import React, { useState } from "react";
import Button from "../button";
import { Link, useNavigate } from "react-router-dom";
import PremiumIcon from "../icons/premiumIcon";

const UpgradeCard: React.FC = () => {
  const [showUpgradePlan, setShowUpgradePlan] = useState(true);
  const navigate = useNavigate();
  const handleUpgrade = () => {
    console.log("Go to plans");
    navigate("/plans");
  };
  return (
    <div
      className={`${
        showUpgradePlan ? "laptop:flex hidden" : "hidden"
      } w-fill px-4 py-2 rounded-lg bg-[#FFE6E5] flex-flex-wrap justify-between items-center relative`}
    >
      <button
        onClick={() => setShowUpgradePlan(false)}
        className="absolute top-[-10px] right-[-10px] flex justify-center items-center p-1 h-6 w-6 rounded-full bg-[#FF3B30]"
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2L8 8M8 8L2 14M8 8L14 14M8 8L2 2"
            stroke="#ffffff"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div className="font-medium text-base">
        You are currently on a free plan, Upgrade your plan to enjoy unlimited
        services.{" "}
        <Link to="/plans" className="text-blue-600">
          Learn more
        </Link>
      </div>
      <Button
        variant="secondary"
        className="max-w-60 w-fill"
        // type="button"
        onClick={handleUpgrade}
      >
        <PremiumIcon />
        Upgrade plan
      </Button>
    </div>
  );
};

export default UpgradeCard;
