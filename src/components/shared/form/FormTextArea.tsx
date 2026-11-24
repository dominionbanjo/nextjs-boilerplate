import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "../../../lib/utils";

interface IProps extends React.ComponentProps<"textarea"> {
  label?: string;
  description?: string;
  wrapperClassName?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextArea({
  description,
  label,
  name,
  wrapperClassName,
  required,
  value: controlledValue,
  onChange: controlledOnChange,
  ...rest
}: IProps) {
  const form = useFormContext();
  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined;

  if (isControlled) {
    return (
      <div className={cn("space-y-1 w-full", wrapperClassName)}>
        {label && (
          <label className="text-base opacity-80 font-medium">
            {label}{" "}
            {required && <span className="text-destructive text-sm">*</span>}
          </label>
        )}
        <Textarea
          value={controlledValue}
          onChange={controlledOnChange}
          {...rest}
        />
        {description && <p className="text-[12px] text-gray">{description}</p>}
      </div>
    );
  }

  if (!name) {
    throw new Error("name is required");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("gap-1 w-full", wrapperClassName)}>
          {label && (
            <FormLabel className="text-base opacity-80 font-medium">
              {label}{" "}
              {required && <span className="text-destructive text-sm">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Textarea {...field} {...rest} />
          </FormControl>
          {description && (
            <FormDescription className="text-[12px] text-gray">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

