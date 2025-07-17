import HoverWord from "./HoverWord"
interface HoverTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

const HoverText = ({ text, className = "", wordClassName = "" }: HoverTextProps) => {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <HoverWord word={word} className={wordClassName} />
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

export default HoverText;