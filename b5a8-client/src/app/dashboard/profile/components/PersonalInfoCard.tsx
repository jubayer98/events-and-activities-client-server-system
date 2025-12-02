import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalInfoCardProps {
  isEditing: boolean;
  isSaving: boolean;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  location: string;
  profileImage: string;
  interests: string;
  bio: string;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setGender: (value: string) => void;
  setLocation: (value: string) => void;
  setProfileImage: (value: string) => void;
  setInterests: (value: string) => void;
  setBio: (value: string) => void;
}

export default function PersonalInfoCard({
  isEditing,
  isSaving,
  firstName,
  lastName,
  email,
  gender,
  location,
  profileImage,
  interests,
  bio,
  onEdit,
  onCancel,
  onSubmit,
  setFirstName,
  setLastName,
  setEmail,
  setGender,
  setLocation,
  setProfileImage,
  setInterests,
  setBio,
}: PersonalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={onEdit}>Edit Profile</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onSubmit} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender} disabled={!isEditing}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male" className="font-normal">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female" className="font-normal">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Third" id="third" />
                    <Label htmlFor="third" className="font-normal">
                      Third
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!isEditing}
                placeholder="City, Country"
              />
            </div>

            {/* Profile Image URL */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                disabled={!isEditing}
                placeholder="https://..."
              />
            </div>

            {/* Interests */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                disabled={!isEditing}
                placeholder="Technology, Sports, Music"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
