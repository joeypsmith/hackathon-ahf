"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import * as React from "react"
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

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  fullName: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .optional(),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }).nullable().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),

  race: z.string().optional(),
  ssn: z
    .string()
    .min(1, "SSN must be provided")
    .regex(/^[0-9\-]{4,11}$/, "SSN format looks invalid")
    .optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, "Phone number looks invalid")
    .optional(),

  maritalStatus: z
    .enum(["single", "married", "not_married", "divorced_separated"])
    .optional(),

  partner: z
    .object({
      name: z.string().optional(),
      dateOfBirth: z.date().nullable().optional(),
      race: z.string().optional(),
      ssn: z.string().optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
    })
    .optional(),

  emergencyContact: z
    .object({
      name: z.string().optional(),
      relationship: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
})

export default function Demographics() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: undefined,
      gender: undefined,
      race: "",
      ssn: "",             
      address: "",            
      phone: "",              
      maritalStatus: "single", 
      partner: {
        name: "",
        dateOfBirth: undefined,
        race: "",
        ssn: "",
        gender: undefined,
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    },
  })

  const maritalStatus = form.watch("maritalStatus")

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

  const showPartnerSection = maritalStatus === "married" || maritalStatus === "not_married"

  return (
    <Card className="w-full sm:max-w-3xl">
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
        <CardDescription>Basic information about yourself.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldGroup className="flex gap-4">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <FieldLabel htmlFor="form-rhf-input-fullName">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="(First Last)"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="w-[180px]" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-gender">Gender</FieldLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "" ? undefined : val)}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger id="form-rhf-input-gender" className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other / Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="dateOfBirth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="w-[220px]" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-dob">Date of Birth</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="form-rhf-input-dob"
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          {field.value ? format(field.value as Date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => field.onChange(date ?? null)}
                          initialFocus
                          captionLayout="dropdown"                 
                          fromYear={1900}                          
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Controller
                name="race"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-race">Race</FieldLabel>
                    <Input {...field} id="form-rhf-input-race" placeholder="Race / Ethnicity" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="ssn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-ssn">SSN (if applicable)</FieldLabel>
                    <Input {...field} id="form-rhf-input-ssn" placeholder="123-45-6789" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-phone">Phone (if applicable)</FieldLabel>
                    <Input {...field} id="form-rhf-input-phone" placeholder="(555) 555-5555" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-address">Address (if applicable)</FieldLabel>
                    <Input {...field} id="form-rhf-input-address" placeholder="Street, City, State, ZIP" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="maritalStatus"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="form-rhf-input-marital">Marital Status</FieldLabel>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value ?? "single"}>
                      <SelectTrigger id="form-rhf-input-marital" className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="not_married">Not Married</SelectItem>
                        <SelectItem value="divorced_separated">Divorced / Separated</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>

            {showPartnerSection && (
              <FieldSet className="border rounded-md p-4">
                <CardTitle className="text-sm mb-2">Partner Information</CardTitle>

                <FieldGroup className="flex gap-4">
                  <Controller
                    name="partner.name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="flex-1" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="partner-name">Partner's Name</FieldLabel>
                        <Input {...field} id="partner-name" placeholder="Partner Full Name" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="partner.gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="w-[160px]" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="partner-gender">Partner's Gender</FieldLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val === "" ? undefined : val)}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger id="partner-gender" className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="partner.dateOfBirth"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="w-[220px]" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="partner-dob">Partner's Date of Birth</FieldLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left" id="partner-dob">
                              {field.value ? format(field.value as Date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={(date) => field.onChange(date ?? null)}
                              initialFocus
                              captionLayout="dropdown"                
                              fromYear={1900}                          
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Controller
                    name="partner.race"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="partner-race">Partner's Race</FieldLabel>
                        <Input {...field} id="partner-race" placeholder="Partner Race / Ethnicity" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="partner.ssn"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="partner-ssn">Partner's SSN</FieldLabel>
                        <Input {...field} id="partner-ssn" placeholder="123-45-6789" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            )}

            <FieldSet className="mt-4">
              <CardTitle className="text-sm mb-2">Emergency Contact</CardTitle>

              <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Controller
                  name="emergencyContact.name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="emergency-name">Name</FieldLabel>
                      <Input {...field} id="emergency-name" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="emergencyContact.relationship"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="emergency-relationship">Relationship</FieldLabel>
                      <Input {...field} id="emergency-relationship" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="emergencyContact.phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="emergency-phone">Phone</FieldLabel>
                      <Input {...field} id="emergency-phone" placeholder="(555) 555-5555" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
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