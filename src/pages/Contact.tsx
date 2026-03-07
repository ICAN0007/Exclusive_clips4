import { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1200);
  };

  return (
    <>
      <ParticleCanvas />
      <div className="max-w-2xl mx-auto px-[5%] py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Have a question or feedback? Drop us a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Name
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              maxLength={100}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              maxLength={255}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Message
            </label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message..."
              maxLength={1000}
              className="bg-muted/50 border-border/50 min-h-[120px]"
            />
          </div>

          <Button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-bold">
            <Send className="w-4 h-4 mr-2" />
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
