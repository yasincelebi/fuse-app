export interface Label {
  id: string;
  name: string;

}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  labels?: Label[];
  notes?: string[];
  profilePhoto?: string;
  favorite?: boolean;
}