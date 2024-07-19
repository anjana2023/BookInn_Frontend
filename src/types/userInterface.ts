export type UserInterface = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
};

export interface UserWalletInterface {
  _id: string;
  userId: string;
  balance: number;
}