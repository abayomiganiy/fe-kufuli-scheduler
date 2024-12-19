import React from "react";
import Button from "../button";
import PremiumIcon from "../icons/premiumIcon";
import { useNavigate } from "react-router-dom";

interface IAnalytics {
  name: string;
  used: number;
  assigned?: number;
}

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const analytics: IAnalytics[] = [
    {
      name: "Messages schedule",
      used: 25,
      assigned: 500,
    },
    {
      name: "Campaigns",
      used: 1,
      assigned: 5,
    },
    {
      name: "WhatsApp Story Scheduling",
      used: 2,
      assigned: 5,
    },
    {
      name: "Total Views per Story/Message",
      used: 94,
      assigned: +18,
    },
    {
      name: "Average Views per Story",
      used: 25,
      assigned: 500,
    },
    {
      name: "Engagement Rate",
      used: 100,
    },
  ];
  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-col justify-center px-[20px] py-[30px] w-full">
        <div className="flex flex-col items-baseline gap-2">
          <h1 className="font-extrabold text-[16px]">Free Plan</h1>
          <h4 className="text-[14px]">
            Upgrade your free plan to enjoy kufuli without limits
          </h4>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/plans")}
          >
            <PremiumIcon />
            Upgrade plan
          </Button>
        </div>
        <h4 className="font-extrabold text-[16px] w-4/5"></h4>
      </div>
      {analytics.map((item: IAnalytics, index: number) => (
        <div
          key={index}
          className="flex flex-col justify-center px-[20px] py-[30px] w-full"
        >
          <div className="flex items-baseline gap-2">
            <h1 className="font-extrabold text-[61px]">{item.used}</h1>
            <h4 className="font-extrabold text-[16px]">/{item.assigned}</h4>
          </div>
          <h4 className="font-extrabold text-[16px] w-4/5">{item.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
