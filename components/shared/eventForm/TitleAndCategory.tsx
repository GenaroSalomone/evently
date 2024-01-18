import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import Dropdown from "../Dropdown";
import { Input } from "@/components/ui/input";

export const TitleAndCategory = ({ control }: { control: Control<any> }) => (
  <div className="flex flex-col gap-5 md:flex-row">
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              placeholder="Event title"
              {...field}
              className="input-field"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Dropdown onChangeHandler={field.onChange} value={field.value} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
