import { From } from "./from";
import { useMultistepFrom } from "@/hooks/use-multistep-from";

export const Container = () => {
  const { stepIndex, steps, data } = useMultistepFrom();

  return (
    <div className="p-2 flex items-center justify-center gap-2 w-[900px] h-[600px] border rounded-md shadow-sm">
      <div className="flex-1 h-full p-2 border rounded-md flex justify-center items-center relative">
        <span className="absolute top-4 right-6">
          {stepIndex + 1}/{steps.length}
        </span>
        <From />
      </div>
      <div className="flex-1 h-full p-2 pl-8 border rounded-md">
        {Object.entries(data).map((item) => (
          <li key={item[0]}>
            {item[0]} - {item[1]}
          </li>
        ))}
      </div>
    </div>
  );
};