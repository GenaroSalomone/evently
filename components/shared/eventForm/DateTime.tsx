import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import Image from "next/image";
import DatePicker from "react-datepicker";

export const DateTime = ({ control }: { control: Control<any> }) => (
  <div className="flex flex-col gap-5 md:flex-row">
    <FormField
      control={control}
      name="startDateTime"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={24}
                height={24}
                className="filter-grey"
              />
              <p className="ml-3 whitespace-nowrap text-grey-600">
                Start Date:
              </p>
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                wrapperClassName="datePicker"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="endDateTime"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={24}
                height={24}
                className="filter-grey"
              />
              <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                wrapperClassName="datePicker"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
