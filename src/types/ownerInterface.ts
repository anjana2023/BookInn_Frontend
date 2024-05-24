export interface OwnerInterface {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
}
