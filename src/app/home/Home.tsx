import React from "react";
import TopBar from "@/components/TopBar";

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl font-bold">Home</div>
      </div>
    </div>
  );
};

export default Home;
