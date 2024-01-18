import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const PriceAndUrl = ({ control }: { control: Control<any> }) => (
  <div className="flex flex-col gap-5 md:flex-row">
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
              <Image
                src="/assets/icons/dollar.svg"
                alt="dollar"
                width={24}
                height={24}
                className="filter-grey"
              />
              <Input
                type="number"
                placeholder="Price"
                {...field}
                className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <FormField
                control={control}
                name="isFree"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <label
                          htmlFor="isFree"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Free Ticket
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="isFree"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="url"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
              <Image
                src="/assets/icons/link.svg"
                alt="link"
                width={24}
                height={24}
              />
              <Input placeholder="URL" {...field} className="input-field" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
