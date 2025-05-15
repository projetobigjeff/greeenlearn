
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showRank?: boolean;
  rank?: number;
}

const UserAvatar = ({ 
  name, 
  image, 
  className,
  size = 'md',
  showRank = false,
  rank
}: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {showRank && rank && (
        <div className="absolute -bottom-2 -right-2 rounded-full bg-primary text-primary-foreground text-xs w-6 h-6 flex items-center justify-center border-2 border-background">
          {rank}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
