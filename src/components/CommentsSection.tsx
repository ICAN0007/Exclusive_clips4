import { useState } from 'react';
import { MessageCircle, ThumbsUp, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

const MOCK_COMMENTS: Comment[] = [
  { id: '1', author: 'User_42', text: 'Amazing content! 🔥', timestamp: '2 hours ago', likes: 12, liked: false },
  { id: '2', author: 'StreamFan', text: 'Best quality I\'ve seen on this site.', timestamp: '5 hours ago', likes: 8, liked: false },
  { id: '3', author: 'NightOwl', text: 'Keep uploading more like this!', timestamp: '1 day ago', likes: 24, liked: false },
];

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Guest',
      text: newComment.trim(),
      timestamp: 'Just now',
      likes: 0,
      liked: false,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(c =>
      c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  return (
    <div className="mt-8 glass-card p-6">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        Comments ({comments.length})
      </h3>

      {/* Add comment */}
      <div className="flex gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="bg-muted/50 border-border/50 resize-none min-h-[60px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <Send className="w-4 h-4 mr-1" /> Post
            </Button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
              {comment.author[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-foreground/80">{comment.text}</p>
              <button
                onClick={() => handleLikeComment(comment.id)}
                className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                  comment.liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {comment.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
