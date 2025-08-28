export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  profile: {
    firstName: string;
    lastName: string;
    fullName: string;
    bvn: number;
    gender: string;
    maritalStatus: string;
    children: string | number;
    residence: string;
    education: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    income: string;
    loanRepayment: number;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}