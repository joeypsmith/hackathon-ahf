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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
  // birthdate will be stored as a Date. We preprocess empty strings so the
  // validator emits a required error when missing.
  birthdate: z.preprocess((arg) => {
    if (typeof arg === "string") {
      if (arg === "") return undefined
      // ISO date string (YYYY-MM-DD) from <input type="date"> -> Date
      return new Date(arg)
    }
    return arg
  }, z.date()),
  //field array
  children: z
    .array(
      z.object({
        name: z.string().min(1, "Child name is required"),
        age: z.number().min(0, "Age must be 0 or greater").max(18, "Age must be 18 or less"),
        birthdate: z.preprocess((arg) => {
          if (typeof arg === "string") {
            if (arg === "") return undefined
            return new Date(arg)
          }
          return arg
        }, z.date())
      })
    )
})

export default function FormRhfInput() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      birthdate: undefined,
      children: [{ name: "", age: 0, birthdate: undefined }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  })

  function onSubmit(data: any) {
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="shadcn"
                    autoComplete="username"
                  />
                  <FieldDescription>
                    This is your public display name. Must be between 3 and 10
                    characters. Must only contain letters, numbers, and
                    underscores.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="gap-4">
            <Controller
              name="birthdate"
              control={form.control}
              render={({ field, fieldState }) => {
                // field.value is a Date | undefined
                const value = field.value instanceof Date && !isNaN(field.value.getTime())
                  ? field.value.toISOString().slice(0, 10)
                  : ""

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-birthdate">
                      Birthdate
                    </FieldLabel>
                    <Input
                      id="form-rhf-input-birthdate"
                      type="date"
                      value={value}
                      onChange={(e) => {
                        const v = e.target.value
                        if (v === "") {
                          // clear the value
                          field.onChange(undefined)
                        } else {
                          field.onChange(new Date(v))
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Your birthdate. This field is required.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
            
          <FieldGroup className="gap-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Child {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <Controller
                    name={`children.${index}.name`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`form-rhf-input-child-name-${index}`}>
                          Name
                        </FieldLabel>
                        <Input
                          {...controllerField}
                          id={`form-rhf-input-child-name-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Child's Name"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`children.${index}.age`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`form-rhf-input-child-age-${index}`}>
                          Age
                        </FieldLabel>
                        <Input
                          {...controllerField}
                          id={`form-rhf-input-child-age-${index}`}
                          type="number"
                          min={0}
                          max={18}
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => controllerField.onChange(Number(e.target.value))}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`children.${index}.birthdate`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => {
                      const value = controllerField.value instanceof Date && !isNaN(controllerField.value.getTime())
                        ? controllerField.value.toISOString().slice(0, 10)
                        : ""

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`form-rhf-input-child-birthdate-${index}`}>
                            Date of Birth
                          </FieldLabel>
                          <Input
                            id={`form-rhf-input-child-birthdate-${index}`}
                            type="date"
                            value={value}
                            onChange={(e) => {
                              const v = e.target.value
                              if (v === "") {
                                controllerField.onChange(undefined)
                              } else {
                                controllerField.onChange(new Date(v))
                              }
                            }}
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    }
                  />
                </CardContent>
                <CardFooter className="p-0 pt-4">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    Remove Child
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </FieldGroup>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", age: 0, birthdate: undefined })}
            disabled={fields.length >= 5}
            className="mt-4"
          >
            Add Child
          </Button>
        </form>
        
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-input">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
