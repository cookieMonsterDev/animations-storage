import { useMultistepFrom } from "@/hooks/use-multistep-from";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().min(1, "Bio is required"),
  gender: z.string().min(1, "Gender is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
});

type Inputs = z.infer<typeof FormDataSchema>;

export const From = () => {
  const { steps, stepIndex, next, prev, updateData, to } = useMultistepFrom();

  const isPrevDisabled = stepIndex === 0;
  const isSubmit = stepIndex === steps.length - 1;

  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
  });

  const onNext = async () => {
    const fields = steps[stepIndex];
    const output = await form.trigger(fields, { shouldFocus: true });
    console.log(output);

    if (!output) return;

    if (isSubmit) {
      updateData(form.getValues());
      form.reset();
      to(0);
    } else {
      next();
    }
  };

  return (
    <div className="flex flex-col space-y-12">
      <Form {...form}>
        <form className="space-y-6">
          {steps[stepIndex].map((item) => (
            <FormField
              key={item}
              control={form.control}
              name={item}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {item.at(0)?.toLocaleUpperCase() + item.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        item.at(0)?.toLocaleUpperCase() + item.slice(1)
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
      <div className="flex gap-2 justify-between">
        <Button className="flex-1" disabled={isPrevDisabled} onClick={prev}>
          Prev
        </Button>
        <Button className="flex-1" onClick={onNext}>
          {isSubmit ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
