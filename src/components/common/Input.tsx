// Input.tsx
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  className?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  onEnter,
  className = '',
}: InputProps) {
  return (
    <div className="relative w-full">
      {/* 배경 레이어 (그림자 효과) */}
      <div className="absolute left-1 top-1 w-[100%] h-[56px] bg-slate-900 rounded-[23px]" />
      
      {/* 입력 필드 컨테이너 */}
      <div className="relative w-full h-[56px] bg-slate-100 rounded-[23px] border-2 border-slate-900">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              onEnter();
            }
          }}
          placeholder={placeholder}
          className={`
            w-full h-full px-5
            bg-transparent
            text-slate-900 placeholder-slate-400
            focus:outline-none
            rounded-[23px]
            ${className}
          `}
        />
      </div>
    </div>
  );
}