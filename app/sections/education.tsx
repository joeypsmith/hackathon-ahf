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

export function EducationForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasDisability, setHasDisability] = useState<string>("no");
  const [enrolled, setEnrolled] = useState<string>("no");
  const [lessThanHS, setLessThanHS] = useState(false);
  const [ged, setGed] = useState(false);
  const [hsGrad, setHsGrad] = useState(false);
  const [vocTech, setVocTech] = useState(false);
  const [someCollege, setSomeCollege] = useState(false);
  const [collegeGrad, setCollegeGrad] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ----- Education level ----- */}
        <div className="space-y-2">
          <Label className="font-medium">What level of education have you completed?</Label>

          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lessThanHS"
                checked={selected === "lessThanHS"}
                onCheckedChange={() => handleSelect("lessThanHS")}
              />
              <Label htmlFor="lessThanHS">Less than high school</Label>
            </div>
            {selected === "lessThanHS" && (
              <Input placeholder="Last grade completed" className="ml-6 w-48" />
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ged"
                checked={selected === "ged"}
                onCheckedChange={() => handleSelect("ged")}
              />
              <Label htmlFor="ged">G.E.D.</Label>
            </div>
            {selected === "ged" && (
              <Input placeholder="Year" className="ml-6 w-32" />
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hsGrad"
                checked={selected === "hsGrad"}
                onCheckedChange={() => handleSelect("hsGrad")}
              />
              <Label htmlFor="hsGrad">High school graduate</Label>
            </div>
            {selected === "hsGrad" && (
              <Input placeholder="Year" className="ml-6 w-32" />
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="vocTech"
                checked={selected === "vocTech"}
                onCheckedChange={() => handleSelect("vocTech")}
              />
              <Label htmlFor="vocTech">Vocational/Technical Certificate</Label>
            </div>
            {selected === "vocTech" && (
              <Input placeholder="Year" className="ml-6 w-32" />
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="someCollege"
                checked={selected === "someCollege"}
                onCheckedChange={() => handleSelect("someCollege")}
              />
              <Label htmlFor="someCollege">Some College – How many credits?</Label>
            </div>
            {selected === "someCollege" && (
              <div className="ml-6 space-y-2">
                <Input placeholder="Credits" className="w-32" />
                <Input placeholder="List course study" className="w-full" />
                <Input placeholder="Year(s) of attendance" className="w-48" />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="collegeGrad"
                checked={selected === "collegeGrad"}
                onCheckedChange={() => handleSelect("collegeGrad")}
              />
              <Label htmlFor="collegeGrad">College Graduate</Label>
            </div>
            {selected === "collegeGrad" && (
              <div className="ml-6 space-y-2">
                <Input placeholder="Year" className="w-32" />
                <Input placeholder="Degree" className="w-48" />
              </div>
            )}
          </div>
        </div>

        {/* ----- Learning disability ----- */}
        <div className="space-y-2">
          <Label className="font-medium">Have you been diagnosed as having a learning disability?</Label>
          <RadioGroup
            value={hasDisability}
            onValueChange={setHasDisability}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="yes" id="disability-yes" />
              <Label htmlFor="disability-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="no" id="disability-no" />
              <Label htmlFor="disability-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* ----- Currently enrolled ----- */}
        <div className="space-y-2">
          <Label className="font-medium">Are you currently enrolled in an educational program?</Label>
          <RadioGroup
            value={enrolled}
            onValueChange={setEnrolled}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="yes" id="enrolled-yes" />
              <Label htmlFor="enrolled-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="no" id="enrolled-no" />
              <Label htmlFor="enrolled-no">No</Label>
            </div>
          </RadioGroup>

          {enrolled === "yes" && (
            <Input
              placeholder="If yes, please list school or program"
              className="mt-2 w-full"
            />
          )}
        </div>
      </CardContent>

      <CardFooter>
        {/* Add submit button or any other actions here */}
      </CardFooter>
    </Card>
  );
}

export default EducationForm;
