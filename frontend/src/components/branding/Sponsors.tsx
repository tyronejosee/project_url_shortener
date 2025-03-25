import { ScrollVelocity } from "@/components/animated";
import { Heart, Star, Smile, Rocket, Cloud, Sun } from "lucide-react";

export default function Sponsors() {
  const icons = [Heart, Star, Smile, Rocket, Cloud, Sun];

  return (
    <section className="max-w-screen-sm mx-auto rounded-xl mt-12">
      <div className="flex items-center gap-6">
        <p>Customers</p>
        <ScrollVelocity
          icons={icons}
          velocity={40}
          iconSize={60}
          direction="left"
          className="text-neutral-300"
        />
      </div>
    </section>
  );
}
