import { useState } from 'react';
import { BarChart3, MessageCircle, Film, Trash2, Eye, EyeOff, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';

const MOCK_STATS = [
  { label: 'Total Views', value: '1.2M', icon: Eye, trend: '+12%' },
  { label: 'Total Posts', value: '126', icon: Film, trend: '+3' },
  { label: 'Comments', value: '584', icon: MessageCircle, trend: '+28' },
  { label: 'Active Users', value: '3.4K', icon: Users, trend: '+5%' },
];

const MOCK_POSTS = [
  { id: 1, title: 'A Night to Remember', views: '45K', status: 'published', comments: 12 },
  { id: 2, title: 'Summer Vibes Collection', views: '32K', status: 'published', comments: 8 },
  { id: 3, title: 'Premium Content Pack', views: '28K', status: 'draft', comments: 0 },
  { id: 4, title: 'Trending Highlights', views: '67K', status: 'published', comments: 24 },
  { id: 5, title: 'New Release Special', views: '12K', status: 'published', comments: 5 },
];

const MOCK_COMMENTS_LIST = [
  { id: 1, author: 'User_42', text: 'Amazing content! 🔥', post: 'A Night to Remember', flagged: false },
  { id: 2, author: 'StreamFan', text: 'Best quality!', post: 'Summer Vibes', flagged: false },
  { id: 3, author: 'Spammer99', text: 'Buy cheap stuff at...', post: 'Trending Highlights', flagged: true },
  { id: 4, author: 'NightOwl', text: 'Keep uploading!', post: 'Premium Content', flagged: false },
];

type Tab = 'overview' | 'posts' | 'comments';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [comments, setComments] = useState(MOCK_COMMENTS_LIST);

  const togglePostStatus = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const tabs: { key: Tab; label: string; icon: typeof BarChart3 }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'posts', label: 'Posts', icon: Film },
    { key: 'comments', label: 'Comments', icon: MessageCircle },
  ];

  return (
    <>
      <ParticleCanvas />
      <div className="max-w-6xl mx-auto px-[5%] py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black mb-8">
          <span className="gradient-text">Admin Dashboard</span>
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.key)}
              className={`gap-2 shrink-0 ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'border-border'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_STATS.map(stat => (
              <Card key={stat.label} className="glass-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center justify-between">
                    {stat.label}
                    <stat.icon className="w-4 h-4 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Posts */}
        {activeTab === 'posts' && (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span>{post.views} views</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status}
                  </Badge>
                  <Button size="icon" variant="ghost" onClick={() => togglePostStatus(post.id)} className="h-8 w-8">
                    {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comments */}
        {activeTab === 'comments' && (
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className={`glass-card p-4 flex items-center justify-between gap-4 flex-wrap ${comment.flagged ? 'border-destructive/50' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.author}</span>
                    {comment.flagged && <Badge variant="destructive" className="text-[10px]">Flagged</Badge>}
                  </div>
                  <p className="text-sm text-foreground/80 truncate">{comment.text}</p>
                  <span className="text-xs text-muted-foreground">on: {comment.post}</span>
                </div>
                <Button size="icon" variant="ghost" onClick={() => deleteComment(comment.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No comments to review.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
