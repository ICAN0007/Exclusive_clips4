import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToVideos: () => void;
}

const HeroSection = ({ onScrollToVideos }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-20">
      <div className="space-y-8">
        <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] gradient-text animate-kinetic">
          <span className="block">PREMIUM</span>
          <span className="block">4K</span>
          <span className="block">EXCLUSIVE</span>
        </h1>
        <Button 
          variant="hero" 
          size="xl"
          onClick={onScrollToVideos}
          className="animate-pulse-glow"
        >
          START WATCHING
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
