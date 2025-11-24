import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ResumeSection({ title, children, className }: ResumeSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mb-8", className)}
    >
      <h3 className="text-lg font-serif font-bold text-primary uppercase tracking-wider border-b-2 border-primary/10 pb-2 mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

export function ResumeItem({ 
  title, 
  subtitle, 
  period, 
  description, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  period: string; 
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0 group">
      <div className="flex justify-between items-baseline mb-1">
        <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</h4>
        <span className="text-sm text-muted-foreground font-medium">{period}</span>
      </div>
      <p className="text-primary/80 font-medium mb-2">{subtitle}</p>
      {description && <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>}
      {children}
    </div>
  );
}
