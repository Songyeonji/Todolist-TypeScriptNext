# Do it; Todo List

할 일 관리를 위한 웹 애플리케이션(https://todolist-type-script-next.vercel.app/)

📌 프로젝트 소개  
Next.js 의 App Router를 활용한 모던한 Todo List 애플리케이션입니다. 사용자 친화적인 UI/UX와 반응형 디자인을 통해 효율적인 할 일 관리 경험을 제공합니다.

## 🌟 주요 기능
- ✅ Todo 항목 CRUD 기능
- 📝 메모 기능
- 🖼️ 이미지 업로드
- ✨ 실시간 상태 업데이트
- 📱 반응형 디자인
- 
## 📱 사용 방법

1. **할 일 추가하기**
  - 상단 입력창에 할 일을 입력합니다
  - Enter키 또는 '추가하기' 버튼을 클릭합니다

2. **할 일 관리하기**
  - 체크박스를 클릭하여 완료 상태를 변경할 수 있습니다
  - 할 일을 클릭하면 상세 페이지로 이동합니다

3. **상세 페이지 기능 (마우스 커서가 변하는 부분)**
  - 제목 수정: 제목을 클릭하여 수정할 수 있습니다 
  - 메모 추가: 메모 영역에 자유롭게 메모를 작성할 수 있습니다
  - 이미지 업로드: 이미지 영역을 클릭하여 이미지를 추가할 수 있습니다
  - 삭제하기: '삭제하기' 버튼을 클릭하여 할 일을 삭제할 수 있습니다

## 🛠️ 기술 스택
**프레임워크 & 라이브러리**
- Next.js 
- TypeScript
- Tailwind CSS
- Axios

## 📁 프로젝트 구조
```src/
├── app/                 # Next.js 13 App Router
│   ├── items/
│   │   └── [id]/       # 동적 라우팅
│   ├── layout.tsx      # 레이아웃 설정
│   └── page.tsx        # 메인 페이지
├── components/
│   ├── common/         # 공통 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Checkbox.tsx
│   └── todo/          # Todo 관련 컴포넌트
│       ├── ItemDetail.tsx
│       ├── ItemDetail.tsx
│       ├── EmptyState.tsx
│       └── ItemListItem.tsx
├── hooks/             # 커스텀 훅
│   ├── useItems.ts
│   └── useItemDetail.ts
├── lib/              # 유틸리티
│   └── api.ts        # API 통신
└── types/            # 타입 정의
    └── item.ts
```

## ⚡ 성능 최적화
**컴포넌트 최적화**

- React.memo를 통한 불필요한 리렌더링 방지
- 이미지 lazy 로딩 구현
- 디바운스된 입력 처리

**상태 관리 최적화**

- 메모이제이션된 값과 콜백
- 효율적인 상태 업데이트
- 최적화된 리스트 렌더링
