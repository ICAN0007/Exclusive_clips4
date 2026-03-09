import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToVideos: () => void;
}

const HeroSection = ({ onScrollToVideos }: HeroSectionProps) => {
  return (
    <section className="min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center text-center pt-24 sm:pt-20 px-4">
      <div className="space-y-6 sm:space-y-8">
        <h1 className="text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.9] gradient-text animate-kinetic">
          <span className="block">PREMIUM</span>
          <span className="block">4K</span>
          <span className="block">EXCLUSIVE</span>
        </h1>
        <Button 
          variant="hero" 
          size="xl"
          onClick={onScrollToVideos}
          className="animate-pulse-glow text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
        >
          START WATCHING
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
