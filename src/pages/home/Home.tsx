import React from "react";
import SectionHeader from "../../components/SectionHeader";
import Analytics from "../../components/analytics";

const Home: React.FC = () => {
  const activeCampaigns = [
    {
      title: "Campaign 1",
      status: "Active",
      date: "2021-01-01",
      budget: "$10,000",
      impressions: "100,000",
      clicks: "50,000",
      conversions: "25,000",
      image: "",
    },
  ];
  return (
    <div className="">
      <SectionHeader
        title="Active Campaigns"
        icon={
          <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 22.9598C4.5 18.7465 4.5 16.6397 5.51118 15.1264C5.94894 14.4713 6.51144 13.9088 7.16658 13.471C8.67992 12.4598 10.7866 12.4598 15 12.4598H21C25.2134 12.4598 27.3201 12.4598 28.8334 13.471C29.4885 13.9088 30.051 14.4713 30.4888 15.1264C31.5 16.6397 31.5 18.7465 31.5 22.9598C31.5 27.1732 31.5 29.2799 30.4888 30.7933C30.051 31.4483 29.4885 32.0108 28.8334 32.4487C27.3201 33.4598 25.2134 33.4598 21 33.4598H15C10.7866 33.4598 8.67992 33.4598 7.16658 32.4487C6.51144 32.0108 5.94894 31.4483 5.51118 30.7933C4.5 29.2799 4.5 27.1732 4.5 22.9598Z"
              stroke="#202020"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.8246 23.5777C22.6125 24.3835 21.6103 24.9529 19.6057 26.0918C17.6678 27.1927 16.699 27.7432 15.9181 27.5219C15.5953 27.4304 15.3012 27.2567 15.064 27.0173C14.4902 26.4385 14.4902 25.3157 14.4902 23.0701C14.4902 20.8246 14.4902 19.7018 15.064 19.1229C15.3012 18.8836 15.5953 18.7099 15.9181 18.6184C16.699 18.3971 17.6678 18.9476 19.6057 20.0485C21.6103 21.1873 22.6125 21.7567 22.8246 22.5625C22.9121 22.8952 22.9121 23.2451 22.8246 23.5777Z"
              stroke="#202020"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M28.5 12.4598C28.4732 10.6002 28.335 9.54583 27.6273 8.83852C26.7481 7.95984 25.3332 7.95984 22.5033 7.95984H13.4967C10.6668 7.95984 9.25179 7.95984 8.37264 8.83852C7.66494 9.54583 7.52691 10.6002 7.5 12.4598"
              stroke="#202020"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.5 7.95984C25.5 6.56202 25.5 5.86311 25.2717 5.31178C24.9672 4.57671 24.3831 3.99268 23.6481 3.6882C23.0967 3.45984 22.3979 3.45984 21 3.45984H15C13.6022 3.45984 12.9033 3.45984 12.3519 3.6882C11.6169 3.99268 11.0328 4.57671 10.7284 5.31178C10.5 5.86311 10.5 6.56202 10.5 7.95984"
              stroke="#202020"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        link="/campaigns"
      />
      <div className="flex overflow-auto no-scrollbar">
        <div className="flex gap-4 flex-nowrap">
          <div className="laptop:w-40 w-32 laptop:h-64 h-48 cursor-pointer flex flex-col items-center justify-between bg-[#E5E5E5] p-4 rounded-2xl border border-gray-200">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M36 24V48M48 36H24"
                stroke="#202020"
                stroke-width="4.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M66 36C66 19.4314 52.5684 6 36 6C19.4314 6 6 19.4314 6 36C6 52.5684 19.4314 66 36 66C52.5684 66 66 52.5684 66 36Z"
                stroke="#202020"
                stroke-width="4.5"
              />
            </svg>
            <div className="">New campaign</div>
          </div>
          {activeCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="laptop:w-40 w-32 laptop:h-64 h-48 flex cursor-pointer items-center justify-between bg-[#E5E5E5] p-4 rounded-2xl border border-gray-200"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-sm font-medium">{campaign.title}</h3>
                <p className="text-xs text-gray-500">{campaign.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionHeader title="Analytics" />
      <Analytics />
    </div>
  );
};

export default Home;
