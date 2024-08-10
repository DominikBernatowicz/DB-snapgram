import { FC } from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Control } from "react-hook-form"

type FormTextFieldProps = {
  control: Control<any>, 
  name: string, 
  type?: string, 
  className?: string, 
  desription?: string
}

const FormTextField: FC<FormTextFieldProps> = ({control, name, type='text', className='shad-input', desription}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name[0].toUpperCase() + name.slice(1)}</FormLabel>
          <FormControl>
            <Input type={type} className={className} {...field} />
          </FormControl>
          <FormDescription>
            {desription}
          </FormDescription>
          <FormMessage className="shad-form_message"/>
        </FormItem>
      )}
    />
  )
}

export default FormTextField