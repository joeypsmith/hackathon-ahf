"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  hasVehicles: z.boolean(),
  vehicles: z
    .array(
      z.object({
        make: z.string().min(1, "Vehicle make is required"),
        model: z.string().min(1, "Vehicle model is required"),
        year: z
          .string()
          .regex(/^\d{4}$/, "Year must be a 4-digit number")
          .refine(
            (val) => {
              const year = parseInt(val)
              const currentYear = new Date().getFullYear()
              return year >= 1900 && year <= currentYear + 1
            },
            "Year must be between 1900 and next year"
          ),
      })
    )
    .optional()
}).refine((data) => {
  if (data.hasVehicles) {
    return data.vehicles && data.vehicles.length > 0
  }
  return true
}, {
  message: "Please add at least one vehicle or select 'No vehicles'",
  path: ["vehicles"]
})

export default function Vehicles() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasVehicles: true,
      vehicles: [{ make: "", model: "", year: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vehicles",
  })

  const hasVehicles = form.watch("hasVehicles")

  // Handle the checkbox change
  const handleHasVehiclesChange = (checked: boolean) => {
    if (checked && fields.length === 0) {
      append({ make: "", model: "", year: "" })
    } else if (!checked) {
      // Clear all vehicles when "no vehicles" is selected
      while (fields.length > 0) {
        remove(0)
      }
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full max-w-full sm:max-w-md mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Vehicle Information</CardTitle>
        <CardDescription className="text-sm">
          Please provide information about your vehicles.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form id="form-vehicles" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4 sm:gap-6">
            {/* Checkbox for "I have vehicles" */}
            <Controller
              name="hasVehicles"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="has-vehicles"
                      checked={field.value}
                      onChange={(e) => {
                        console.log("Native checkbox clicked, checked:", e.target.checked)
                        field.onChange(e.target.checked)
                        handleHasVehiclesChange(e.target.checked)
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <FieldLabel 
                      htmlFor="has-vehicles" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      I have vehicles to report
                    </FieldLabel>
                  </div>
                  <FieldDescription className="text-xs sm:text-sm">
                    Check this box if you own or have access to any vehicles
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Vehicle fields - only show if hasVehicles is true */}
            {hasVehicles && fields.map((field, index) => (
              <div key={field.id} className="space-y-3 sm:space-y-4 p-3 sm:p-4 border rounded-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h4 className="text-sm font-medium">Vehicle {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="self-start sm:self-auto"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <Controller
                  name={`vehicles.${index}.make`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`vehicle-make-${index}`} className="text-sm font-medium">
                        Make
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={`vehicle-make-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., Toyota, Ford"
                        className="text-base"
                      />
                      <FieldDescription className="text-xs sm:text-sm">
                        Vehicle manufacturer or brand
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`vehicles.${index}.model`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`vehicle-model-${index}`} className="text-sm font-medium">
                        Model
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={`vehicle-model-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., Camry, F-150"
                        className="text-base"
                      />
                      <FieldDescription className="text-xs sm:text-sm">
                        Specific model name
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`vehicles.${index}.year`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`vehicle-year-${index}`} className="text-sm font-medium">
                        Year
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={`vehicle-year-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., 2020"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="text-base"
                      />
                      <FieldDescription className="text-xs sm:text-sm">
                        Manufacturing year
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            ))}
          </FieldGroup>
          
          {/* Add Vehicle button - only show if hasVehicles is true */}
          {hasVehicles && (
            <div className="mt-3 sm:mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ make: "", model: "", year: "" })}
                disabled={fields.length >= 5}
                className="w-full sm:w-auto"
              >
                Add Vehicle
              </Button>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <Field orientation="horizontal" className="w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
            className="flex-1 sm:flex-none"
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            form="form-vehicles"
            className="flex-1 sm:flex-none"
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}