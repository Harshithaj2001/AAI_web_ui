import { motion } from "framer-motion";
const teamImage = '/placeholder.svg';

const TeamSection = () => {
  return (
    <section className="relative">
      <div className="w-full h-[500px] md:h-[600px] overflow-hidden relative">
        <img
          src={teamImage}
          alt="Team collaborating in modern office"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative md:absolute md:bottom-12 md:right-12 bg-white/95 backdrop-blur-sm border border-border p-8 md:p-10 max-w-md mx-6 md:mx-0 -mt-24 md:mt-0 z-10 rounded-[22px] shadow-lg"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-gold-deep mb-4 font-bold">Our Services</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We partner with forward-thinking organizations to drive digital transformation 
          through innovative technology solutions. From AI-powered automation to robust 
          cybersecurity frameworks, we deliver comprehensive strategies that accelerate 
          growth and operational excellence.
        </p>
      </motion.div>
    </section>
  );
};

export default TeamSection;
