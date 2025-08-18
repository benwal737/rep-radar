import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Radar gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        {/* Outer radar ring */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-green-400/20 animate-pulse"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-green-400/30 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-green-400/40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-green-400/50 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* radar sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(34, 197, 94, 0.2) 30deg, rgba(34, 197, 94, 0.2) 60deg, rgba(34, 197, 94, 0.8) 90deg, transparent 120deg, transparent 360deg)`,
              animationDuration: "4s",
            }}
          ></div>
        </div>

        {/* Secondary sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: `conic-gradient(from 180deg, transparent 0deg, rgba(34, 197, 94, 0.1) 45deg, rgba(34, 197, 94, 0.2) 90deg, transparent 135deg, transparent 360deg)`,
              animationDuration: "6s",
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            Rep <span className="text-green-400">Radar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-md mx-auto">
            Track your workouts with precision
          </p>
        </div>
        <form action="/sign-in">
          <Button
            type="submit"
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </form>
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </div>
  );
}
