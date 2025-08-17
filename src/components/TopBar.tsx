import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="text-2xl font-bold">Rep Radar</div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default TopBar;
