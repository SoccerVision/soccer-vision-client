export default interface User {
  user_id: string;
  email: string;
  password: string;
  avatar: string;
  userName: string;
  teamName: string;
  Nationality: string;
  invitedBy: string | null;
  isPartialUser: boolean;
  accessToken: string;
}
