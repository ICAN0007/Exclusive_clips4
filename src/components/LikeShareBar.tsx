import { useState } from 'react';
import { Heart, Share2, Link2, Twitter, Facebook, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LikeShareBarProps {
  title: string;
}

const LikeShareBar = ({ title }: LikeShareBarProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 200) + 50);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
    setShowShare(false);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        variant="outline"
        onClick={handleLike}
        className={`gap-2 transition-all ${liked ? 'border-primary text-primary bg-primary/10' : 'border-border'}`}
      >
        <Heart className={`w-4 h-4 ${liked ? 'fill-primary' : ''}`} />
        {likeCount}
      </Button>

      <div className="relative">
        <Button variant="outline" onClick={() => setShowShare(!showShare)} className="gap-2 border-border">
          <Share2 className="w-4 h-4" /> Share
        </Button>
        {showShare && (
          <div className="absolute top-full mt-2 left-0 glass-card p-2 flex gap-1 z-50 animate-in fade-in slide-in-from-top-2">
            <Button size="icon" variant="ghost" onClick={handleCopyLink} className="h-9 w-9 hover:bg-muted">
              <Link2 className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => handleShare('twitter')} className="h-9 w-9 hover:bg-muted">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => handleShare('facebook')} className="h-9 w-9 hover:bg-muted">
              <Facebook className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeShareBar;
