import Image from "next/image";
import { User } from "@/types";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      <div>
        <h3>{user.username}</h3>

        <p>{user.email}</p>
      </div>
    </div>
  );
};
