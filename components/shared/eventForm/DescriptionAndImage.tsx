import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FileUploader } from "../FileUploader";
import { Dispatch, SetStateAction } from "react";

export const DescriptionAndImage = ({
  control,
  setFiles,
}: {
  control: Control<any>;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => (
  <div className="flex flex-col gap-5 md:flex-row">
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="h-72">
            <Textarea
              placeholder="Description"
              {...field}
              className="textarea rounded-2xl"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="h-72">
            <FileUploader
              onFieldChange={field.onChange}
              imageUrl={field.value}
              setFiles={setFiles}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
