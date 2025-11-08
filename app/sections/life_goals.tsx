"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  sixMonths: z.string().optional(),
  twoYears: z.string().optional(),
  fiveYears: z.string().optional(),
  obstacles: z.string().optional(),
  greatestStrength: z.string().optional(),
})

export default function LifeGoalsSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sixMonths: "",
      twoYears: "",
      fiveYears: "",
      obstacles: "",
      greatestStrength: "",
    },
  })

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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Life Goals</CardTitle>
        <CardDescription>Short answer goals and reflections.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="life-goals-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-4">
            <Controller
              name="sixMonths"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="six-months">What would you like to accomplish in the next six months?</FieldLabel>
                  <Textarea {...field} id="six-months" placeholder="Your goals for the next 6 months" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="twoYears"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="two-years">The next two years?</FieldLabel>
                  <Textarea {...field} id="two-years" placeholder="Your goals for the next 2 years" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="fiveYears"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="five-years">The next five years?</FieldLabel>
                  <Textarea {...field} id="five-years" placeholder="Your goals for the next 5 years" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="obstacles"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="obstacles">What obstacles are preventing you from meeting these goals?</FieldLabel>
                  <Textarea {...field} id="obstacles" placeholder="Obstacles or barriers" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="greatestStrength"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="greatest-strength">What do you feel is your greatest strength?</FieldLabel>
                  <Textarea {...field} id="greatest-strength" placeholder="Your greatest strength" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="life-goals-form">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
