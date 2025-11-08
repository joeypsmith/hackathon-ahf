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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const housingOptions = [
  { label: "Shelter", value: "Shelter" },
  { label: "Public Housing", value: "Public Housing" },
  { label: "Section 8", value: "Section 8" },
  { label: "Subsidized", value: "Subsidized" },
  { label: "Market Rate", value: "Market Rate" },
  { label: "Friends", value: "Friends" },
  { label: "Relatives", value: "Relatives" },
  { label: "Car", value: "Car" },
  { label: "Motel", value: "Motel" },
  { label: "Other", value: "Other" },
]


const formSchema = z.object({
  housingOption: z
    .string()
    .min(1, "Please select your current housing")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select your current housing",
    }),
  residenceDuration: z
    .string(),
  payRent: z,
  howMuchRent: z
    .string(),
  livingBefore: z
    .string(),
  howLongLiveBefore: z
    .string(),
  wereYouRenting: z,
  howMuchRentOld: z
    .string(),
  beenEvicted: z,
  whyEvicted: z
    .string(),
  anyUtilities: z
    .string(),
  electricCompany: z
    .string(),
  gasCompany: z
    .string(),
  cableCompany: z
    .string(),
  phoneCompany: z
    .string(),
  waterCompany: z
    .string(),
  electricPrice: z
    .string(),
  gasPrice: z
    .string(),
  cablePrice: z
    .string(),
  phonePrice: z
    .string(),
  waterPrice: z
    .string(),
  receivedAssistance: z,
  whatAssistance: z
    .string(),
  experiencedHomeless: z,
  whatHomeless: z
    .string(),

})

export default function HousingHistory() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      housingOption: "",
      residenceDuration: "",
      payRent: false,
      howMuchRent: "",
      livingBefore: "",
      howLongLiveBefore: "",
      wereYouRenting: false,
      howMuchRentOld: "",
      beenEvicted: "",
      whyEvicted: "",
      anyUtilities: "",
      electricCompany: "",
      gasCompany: "",
      cableCompany: "",
      phoneCompany: "",
      waterCompany: "",
      electricPrice: "",
      gasPrice: "",
      cablePrice: "",
      phonePrice: "",
      waterPrice: "",
      receivedAssistance: false,
      whatAssistance: "",
      experiencedHomeless: false,
      whatHomeless: "",
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
        <CardTitle>Housing History</CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="housingOption"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      In what type of housing are you currently residing?
                    </FieldLabel>
                    <FieldDescription>

                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {housingOptions.map((housingOption) => (
                        <SelectItem key={housingOption.value} value={housingOption.value}>
                          {housingOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="residenceDuration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>How long have you been living at your current address?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="payRent"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Do you pay rent?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {form.watch("payRent") ? (
              <Controller
                name="howMuchRent"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>If yes, how much rent do you pay?</FieldLabel>
                    <FieldDescription>(Weekly or Monthly?)</FieldDescription>
                    <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ) : <></>}
          <Controller
              name="livingBefore"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Where were you living before your current address?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="howLongLiveBefore"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>How long did you reside at this address?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="wereYouRenting"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Were you renting?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {form.watch("wereYouRenting") ? 
            <Controller
              name="howMuchRentOld"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>How much did you pay?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            /> : <></>}
            <Controller
              name="beenEvicted"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Have you ever been evicted?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
             {form.watch("beenEvicted") ? 
            <Controller
              name="whyEvicted"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>If yes, when, where, and why?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            /> : <></>}
            <Controller
              name="anyUtilities"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Do you have any outstanding utility bills (electric, gas, cable/internet, water)?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {form.watch("anyUtilities") ? 
            <div className="space-y-4"><Controller
              name="electricCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Electric company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          <Controller
              name="electricCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Electric company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                      <Controller
              name="electricPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Electric bill price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="gasCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Gas company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                      <Controller
              name="gasPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Gas bill price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="cableCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Cable company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                      <Controller
              name="cablePrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Cable bill price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phoneCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                      <Controller
              name="phonePrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone bill price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="waterCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Water company name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                      <Controller
              name="waterPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Water bill price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            </div>

             : <></>}
          <Controller
              name="receivedAssistance"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Have you ever received housing assistance?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {form.watch("receivedAssistance") ? 
            <Controller
              name="whatAssistance"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>If yes, what type, when, where?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            /> : <></>}
            <Controller
              name="experiencedHomeless"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label">Have you ever found experienced homeless before?</FieldLegend>
                  <FieldDescription>

                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >

                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            {form.watch("experiencedHomeless") ? 
            <Controller
              name="whatHomeless"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>If yes, when were you homeless, how long were you homeless, and where did you stay (in a shelter, with family, with friends, on the street)?</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type=""
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            /> : <></>}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">

        </Field>
      </CardFooter>
    </Card>
  )
}
