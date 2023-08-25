export interface Profile extends Document {
  userId: string;
  imageProfile: string;
  displayName: string;
  gender: string;
  birthday: Date;
  heroscope: string;
  zodiac: string;
  height: number;
  weight: number;
}
