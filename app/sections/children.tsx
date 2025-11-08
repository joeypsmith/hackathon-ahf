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
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  children: z
    .array(
      z.object({
        name: z.string("child name is required"),
        birthday: z.coerce.date(),
        ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/),
      })
    )
})

export default function Children() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      children: [],
    },
    mode: "onChange",
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
        <CardTitle>Children</CardTitle>
        <CardDescription>
          If you have children, please provide their information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-2">
            <FieldGroup>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`children.${index}.name`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Card className="p-4">
                      <CardTitle>
                        Child {index + 1}
                      </CardTitle>
                      <Field data-invalid={fieldState.invalid}>
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
                      <Controller
                        name={`children.${index}.birthday`}
                        control={form.control}
                        render={({ field, fieldState }) => {
                          // field.value is a Date | undefined
                          const value = field.value instanceof Date && !isNaN(field.value.getTime())
                            ? field.value.toISOString().slice(0, 10)
                            : ""

                          return (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={`form-rhf-input-birthdate-${index}`}>
                                Birthdate
                              </FieldLabel>
                              <Input
                                id={`form-rhf-input-birthdate-${index}`}
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
                      <Controller
                        name={`children.${index}.ssn`}
                        control={form.control}
                        render={({ field, fieldState }) => {
                          //field is valid ssn format XXX-XX-XXXX
                          const value = field.value
                          return (
                            <Field>
                              <FieldLabel htmlFor={`form-rhf-input-ssn-${index}`}>
                                Social Security Number
                              </FieldLabel>
                              <Input {...field} 
                                placeholder="XXX-XX-XXXX"
                                aria-invalid={fieldState.invalid}
                              />
                              <FieldDescription>
                                The child's SSN. Format: XXX-XX-XXXX
                              </FieldDescription>
                            </Field>
                          )
                        }}
                      />
                    </Card>
                  )}
                />
              ))}
            </FieldGroup>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", birthday: undefined, ssn: "" })}
              disabled={fields.length >= 5}
            >
              Add Name
            </Button>
          </FieldSet>

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
