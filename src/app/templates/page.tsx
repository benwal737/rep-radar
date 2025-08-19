import Templates from "./Templates";
import { getWorkouts } from "./actions";

const page = async () => {
  const allWorkouts = await getWorkouts();
  return <Templates allWorkouts={allWorkouts} />;
};

export default page;
