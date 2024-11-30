interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit';
    disabled?: boolean;
    className?: string;
    size?: 'small' | 'large';
    icon?: 'add' | 'edit' | 'delete';
  }
  
  export function Button({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    size = 'large',
    icon,
  }: ButtonProps) {
    
    const getIconColor = () => {
        if (disabled) return "#0F172A"; // 비활성화 상태 색상 변경
        if (variant === 'secondary') return "#0F172A";
        return "white";
      };
  
    const IconComponent = {
      add: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8L14 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 14L8 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      edit: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 7L6.5 11.5L14 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      delete: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L12 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 4L4 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    };
  
    const baseStyles = 'flex items-center justify-center rounded-3xl font-bold transition-all border-2 border-slate-900';
    
    const sizeStyles = {
      small: 'w-14 h-14 md:hidden', // 추가하기 버튼용 모바일 스타일
      large: 'w-40 h-14 hidden md:flex',
      default: 'w-40 h-14' // 수정/삭제 버튼용 기본 스타일
    };
    
    const variantStyles = {
        primary: 'bg-primary text-white hover:translate-y-[-2px] disabled:bg-slate-200 disabled:translate-y-0 disabled:text-[#0F172A]',
        secondary: 'bg-slate-100 text-slate-900 hover:translate-y-[-2px] disabled:bg-slate-50 disabled:translate-y-0 disabled:text-[#0F172A]',
        danger: 'bg-rose-500 text-white hover:translate-y-[-2px] disabled:bg-slate-200 disabled:translate-y-0 disabled:text-[#0F172A]',
      };
      
    const currentColor = getIconColor();
  
    // 아이콘이 'add'인 경우에만 모바일에서 작은 버튼으로 표시
    const shouldShowSmallButton = icon === 'add';
  
    const ButtonContent = (isSmall: boolean) => (
      <>
        {icon && (
          <span className={isSmall ? '' : 'mr-2'}>
            {IconComponent[icon](currentColor)}
          </span>
        )}
        {(!isSmall || !shouldShowSmallButton) && children}
      </>
    );
  
    const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="relative">
        <div className="absolute left-[4%] right-[-3%] top-1 h-[58px] bg-slate-900 rounded-3xl" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  
    return (
      <>
        {/* 데스크톱용 버튼 */}
        <ButtonWrapper>
          <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
              ${baseStyles}
              ${sizeStyles.large}
              ${variantStyles[variant]}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              ${className}
            `}
          >
            {ButtonContent(false)}
          </button>
        </ButtonWrapper>
  
        {/* 모바일용 버튼 */}
        {shouldShowSmallButton ? (
          // 추가하기 버튼용 작은 버전
          <ButtonWrapper>
            <button
              type={type}
              onClick={onClick}
              disabled={disabled}
              className={`
                ${baseStyles}
                ${sizeStyles.small}
                ${variantStyles[variant]}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${className}
              `}
            >
              {ButtonContent(true)}
            </button>
          </ButtonWrapper>
        ) : (
          // 수정/삭제 버튼용 기본 버전
          <ButtonWrapper>
            <button
              type={type}
              onClick={onClick}
              disabled={disabled}
              className={`
                ${baseStyles}
                ${sizeStyles.default}
                md:hidden
                ${variantStyles[variant]}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${className}
              `}
            >
              {ButtonContent(false)}
            </button>
          </ButtonWrapper>
        )}
      </>
    );
  }