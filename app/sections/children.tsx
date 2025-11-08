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
        age: z.number({ required_error: "Age is required" }).min(0, "Age must be positive").max(17, "Age must be under 18"),
        dateOfBirth: z.date({ required_error: "Date of birth is required" })
      })
    )
})

export default function Children() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      children: [],
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
                    <Field data-invalid={fieldState.invalid}>
                        <Input
                        {...field}
                        id="form-rhf-input-child-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Child's Name"
                        />
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                    )}
                />
                ))}
            </FieldGroup>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "" })}
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
