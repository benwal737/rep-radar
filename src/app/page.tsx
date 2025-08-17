import React from "react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <form action="/sign-in">
        <Button
          type="submit"
        >Get Started</Button>
      </form>
    </div>
  );
};

export default Home;
