import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/* -------------------------------------------------
   Helper: a radio that can be deselected (reuse from
   the education form)
   ------------------------------------------------- */
function ToggleableRadio({
  value,
  groupValue,
  onChange,
  id,
  children,
}: {
  value: string;
  groupValue: string;
  onChange: (v: string) => void;
  id: string;
  children: React.ReactNode;
}) {
  const selected = groupValue === value;
  const handleClick = () => onChange(selected ? "" : value);

  return (
    <div className="flex items-center space-x-1">
      <RadioGroupItem
        value={value}
        id={id}
        checked={selected}
        onChange={handleClick}
      />
      <Label htmlFor={id}>{children}</Label>
    </div>
  );
}

/* -------------------------------------------------
   Employment form – each field appears only when the
   corresponding toggle/checkbox is active.
   ------------------------------------------------- */
export function EmploymentForm() {
  /* employment status */
  const [employed, setEmployed] = useState<string>(""); // "" | "yes" | "no"

  /* contact permission */
  const [contactOk, setContactOk] = useState<string>(""); // "" | "yes" | "no"

  /* days of the week – independent checkboxes */
  const [days, setDays] = useState<{
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  }>({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const toggleDay = (key: keyof typeof days) => {
    setDays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Employment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ---------- Currently employed? ---------- */}
        <div className="space-y-2">
          <Label className="font-medium">
            Are you currently employed?
          </Label>
          <RadioGroup
            value={employed}
            onValueChange={setEmployed}
            className="flex space-x-4"
          >
            <ToggleableRadio
              value="yes"
              groupValue={employed}
              onChange={setEmployed}
              id="employed-yes"
            >
              Yes
            </ToggleableRadio>
            <ToggleableRadio
              value="no"
              groupValue={employed}
              onChange={setEmployed}
              id="employed-no"
            >
              No
            </ToggleableRadio>
          </RadioGroup>
        </div>

        {/* ---------- Employment details (shown only if employed) ---------- */}
        {employed === "yes" && (
          <div className="space-y-4">
            <Input placeholder="Current employer" className="w-full" />
            <Input placeholder="Position" className="w-full" />
            <Input placeholder="Start date of current position" className="w-full" />
            <Input
              type="number"
              placeholder="Monthly income"
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Hours per week"
              className="w-full"
            />

            {/* ---------- Work days ---------- */}
            <div className="space-y-2">
              <Label className="font-medium">What days of the week do you work?</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-mon"
                    checked={days.mon}
                    onCheckedChange={() => toggleDay("mon")}
                  />
                  <Label htmlFor="day-mon">Monday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-tue"
                    checked={days.tue}
                    onCheckedChange={() => toggleDay("tue")}
                  />
                  <Label htmlFor="day-tue">Tuesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-wed"
                    checked={days.wed}
                    onCheckedChange={() => toggleDay("wed")}
                  />
                  <Label htmlFor="day-wed">Wednesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-thu"
                    checked={days.thu}
                    onCheckedChange={() => toggleDay("thu")}
                  />
                  <Label htmlFor="day-thu">Thursday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-fri"
                    checked={days.fri}
                    onCheckedChange={() => toggleDay("fri")}
                  />
                  <Label htmlFor="day-fri">Friday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-sat"
                    checked={days.sat}
                    onCheckedChange={() => toggleDay("sat")}
                  />
                  <Label htmlFor="day-sat">Saturday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day-sun"
                    checked={days.sun}
                    onCheckedChange={() => toggleDay("sun")}
                  />
                  <Label htmlFor="day-sun">Sunday</Label>
                </div>
              </div>
            </div>

            {/* ---------- May we contact employer? ---------- */}
            <div className="space-y-2">
              <Label className="font-medium">
                May we contact your current employer?
              </Label>
              <RadioGroup
                value={contactOk}
                onValueChange={setContactOk}
                className="flex space-x-4"
              >
                <ToggleableRadio
                  value="yes"
                  groupValue={contactOk}
                  onChange={setContactOk}
                  id="contact-yes"
                >
                  Yes
                </ToggleableRadio>
                <ToggleableRadio
                  value="no"
                  groupValue={contactOk}
                  onChange={setContactOk}
                  id="contact-no"
                >
                  No
                </ToggleableRadio>
              </RadioGroup>

              {contactOk === "yes" && (
                <Input placeholder="Phone (___) _____________" className="w-full" />
              )}
            </div>

            {/* ---------- Child‑care question ---------- */}
            <div className="space-y-2">
              <Label className="font-medium">
                How are your children cared for while you are at work?
              </Label>
              <Input placeholder="Describe care arrangement" className="w-full" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>{/* Add submit button or other actions here */}</CardFooter>
    </Card>
  );
}
