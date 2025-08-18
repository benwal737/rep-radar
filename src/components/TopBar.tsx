import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

const TopBar = () => {
  return (
    <div className="w-full h-10">
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">Rep Radar</div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Separator />
    </div>
  );
};

export default TopBar;
