import { SignUp } from '@clerk/nextjs'
import { ChartLine, Clock, ShieldCheck, Sparkles } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="bg-muted grid flex-1 lg:grid-cols-2">
      <div className="hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex">
        <ul className="max-w-sm space-y-8">
          <li>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <p className="font-semibold">Plan your workouts</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Plan your workouts and progress with ease.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <ChartLine className="size-4" />
              <p className="font-semibold">Track your progress</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Track your progress and see how you're doing.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              <p className="font-semibold">Add custom exercises</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Create your own exercises to fit your needs.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <p className="font-semibold">Never miss a workout</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Never miss a workout again with our easy-to-use interface.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start">
        <SignUp />
      </div>
    </div>
  )
}
