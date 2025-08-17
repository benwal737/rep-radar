import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignedOut>
        <SignInButton forceRedirectUrl="/home" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default SignIn;
