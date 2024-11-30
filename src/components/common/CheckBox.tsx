import Image from 'next/image';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  className?: string;
}

export function Checkbox({ checked, onToggle, className = '' }: CheckboxProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className={`w-7 h-7 flex items-center justify-center rounded-full ${className}`}
    >
      {checked ? (
        <Image
          src="/assets/icon/Property 1=Frame 2610233.png"
          alt="Checked"
          width={32}
          height={32}
        />
      ) : (
        <Image
          src="/assets/icon/Property 1=Default.png"
          alt="Unchecked"
          width={32}
          height={32}
        />
      )}
    </button>
  );
}