import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";

export const Venue = ({ control }: { control: Control<any> }) => (
  <div className="flex flex-col gap-5 md:flex-row">
    <FormField
      control={control}
      name="venue"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
              <Image
                src="/assets/icons/location-grey.svg"
                alt="calendar"
                width={24}
                height={24}
              />
              <Input
                placeholder="Event location or Online"
                {...field}
                className="input-field"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
