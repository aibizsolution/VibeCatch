# 멀티 페이지 GitHub Pages 플랫폼

다양한 독립적인 HTML 페이지(vibeX, pageA, pageB, pageC)를 한 저장소에서 관리하는 멀티 페이지 빌드 시스템입니다.

## 📁 프로젝트 구조

```
소셜리스닝/
├── vibeX/                      # VibeX 프로젝트
│   ├── parts/                  # HTML 조각 파일들 (10개)
│   │   ├── 01-head.html       # <head> 섹션
│   │   ├── 02-header.html     # 네비게이션
│   │   ├── 03-hero.html       # 히어로 + 플랜 카드
│   │   ├── 04-calculator.html # 요금 계산기
│   │   ├── 05-compare-vibecatch.html
│   │   ├── 06-compare-vibeplus.html
│   │   ├── 07-compare-vibeflow.html
│   │   ├── 08-faq.html
│   │   ├── 09-footer.html
│   │   └── 10-scripts.html    # JS 링크
│   ├── vibeX-main.js          # vibeX 메인 UI 로직
│   ├── vibeX-calculator.js    # vibeX 요금 계산기
│   ├── index.html             # 빌드 결과 (자동 생성, .gitignore)
│   └── README.md              # vibeX 프로젝트 설명
│
├── pageA/                      # 미래 프로젝트 A (추가 예정)
│   ├── parts/
│   ├── pageA-script.js        # (필요 시)
│   ├── index.html             # 빌드 결과
│   └── README.md
│
├── pageB/                      # 미래 프로젝트 B
├── pageC/                      # 미래 프로젝트 C
│
├── .gitignore                  # Git 무시 파일
├── package.json                # npm 설정 및 빌드 스크립트
├── build.js                    # 멀티 페이지 빌드 시스템
└── README.md                   # 이 파일 (저장소 전체 설명)
```

## 🎯 핵심 특징

### 1. **독립적인 페이지 구조**
- 각 페이지는 완전히 독립적인 폴더
- 페이지 간 간섭 없음
- 확장 용이 (새 페이지 = 새 폴더)

### 2. **자동 멀티 페이지 빌드**
- `build.js`: 모든 페이지 폴더의 `parts/` 디렉토리를 자동 탐지
- 각 페이지의 HTML 조각들을 합쳐 `index.html` 생성
- 전체 빌드 또는 개별 페이지만 빌드 가능

### 3. **GitHub Pages 호환**
- URL: `https://username.github.io/repo/vibeX/`, `https://username.github.io/repo/pageA/` 등
- 각 페이지 폴더의 `index.html`이 자동 서빙됨

### 4. **AI 작업 시 컨텍스트 분리**
- vibeX 작업 시 → vibeX/ 폴더만 집중
- pageA 작업 시 → pageA/ 폴더만 집중
- 효율적인 협업

## 🚀 빠른 시작

### 사전 요구사항
- Node.js v14 이상
- npm 또는 yarn

### 1️⃣ 초기 설정

```bash
# 프로젝트 디렉토리로 이동
cd "소셜리스닝"

# 의존성 설치
npm install
```

### 2️⃣ 빌드 명령어

```bash
# 모든 페이지 빌드
npm run build

# vibeX만 빌드
npm run build:vibeX

# pageA만 빌드
npm run build:pageA

# 자동 빌드 (파일 변경 감시)
npm run watch

# vibeX만 감시 빌드
npm run watch:vibeX
```

### 3️⃣ 파일 수정 워크플로우

#### vibeX 수정 시:

```bash
# 1. vibeX/parts/04-calculator.html 수정
# 2. 저장 (watch 모드 사용 시 자동 빌드)
npm run watch:vibeX

# 3. vibeX/index.html을 브라우저로 열어 변경사항 확인
# 4. 완료!
```

#### pageA 추가 시:

```bash
# 1. pageA/ 폴더 생성
mkdir pageA
mkdir pageA/parts

# 2. HTML 조각 파일 생성
#    pageA/parts/01-head.html
#    pageA/parts/02-body.html
#    pageA/parts/03-scripts.html
#    ... 등

# 3. 빌드
npm run build:pageA

# 4. pageA/index.html 생성 확인
```

## 📝 각 페이지 폴더 설명

### vibeX 폴더

VibeX 플랫폼의 가격 책정 페이지입니다.

- **parts/**: HTML 조각 파일들 (10개)
- **vibeX-main.js**: 플랜 카드 UI, 토글 로직
- **vibeX-calculator.js**: 요금 계산 로직
- **index.html**: 빌드 결과 (자동 생성)

상세 설명: [vibeX/README.md](vibeX/README.md)

### pageA, pageB, pageC 폴더

미래에 추가될 프로젝트들입니다. vibeX와 동일한 구조를 따릅니다.

## 🔧 npm 빌드 스크립트

**현재 사용 가능한 스크립트:**

| 명령어 | 설명 | 언제 사용 |
|--------|------|---------|
| `npm run build` | 모든 페이지 빌드 (vibeX만 현재) | 전체 배포 전 |
| `npm run build:vibeX` | vibeX만 빌드 | vibeX 수정 후 테스트 |
| `npm run build:pageA` | pageA만 빌드 | pageA 생성 후 사용 |
| `npm run build:pageB` | pageB만 빌드 | pageB 생성 후 사용 |
| `npm run build:pageC` | pageC만 빌드 | pageC 생성 후 사용 |
| `npm run watch` | 모든 폴더 감시 (자동 빌드) | 개발 중 |
| `npm run watch:vibeX` | vibeX 폴더만 감시 | vibeX 개발 중 |
| `npm run watch:pageA` | pageA 폴더만 감시 | pageA 개발 중 |

**실제 사용 예시:**

```bash
# vibeX 개발 중
npm run watch:vibeX
# → vibeX/ 폴더의 변경을 감시하고 자동 빌드

# pageA를 새로 만들었을 때
mkdir pageA
mkdir pageA/parts
# ... 파일 작성 ...
npm run build:pageA
# → pageA/index.html 생성

# 모든 페이지 빌드
npm run build
```

## 📋 파일 수정 가이드

### parts/ 파일 구조

각 파일은 독립적인 HTML 조각입니다. `<html>`, `<head>`, `<body>` 태그는 빌드 스크립트에서 자동 추가되므로, 콘텐츠만 포함하면 됩니다.

#### 예시: vibeX/parts/04-calculator.html 수정

```html
<!-- 이것은 vibeX/parts/04-calculator.html의 일부 -->
<section id="calculator" class="mx-auto max-w-7xl px-4 py-8">
  <h2 class="text-2xl font-bold mb-6">요금 계산기</h2>
  <!-- 계산기 콘텐츠 -->
  <div class="space-y-4">
    <!-- 수정 내용 -->
  </div>
</section>
```

### 수정 시 주의사항

⚠️ **중요:**
- **parts/ 파일만 수정** (index.html은 자동 생성되므로 직접 수정 금지)
- 각 파일은 HTML 조각이므로 완전한 HTML 문서가 아님
- 파일명 앞 숫자 변경 금지 (빌드 순서 결정)
- 수정 후 반드시 빌드: `npm run build:vibeX`

## 🔄 GitHub 업로드 및 관리

### 1️⃣ .gitignore 설정

```gitignore
# 자동 생성 파일
vibeX/index.html
pageA/index.html
pageB/index.html
pageC/index.html
*/index.html

# Node.js
node_modules/
npm-debug.log

# OS
.DS_Store
```

**이유:**
- `index.html`: 자동 생성되므로 버전 관리 불필요
- `node_modules/`: 크기 큼, `package.json`에서 복구 가능

### 2️⃣ GitHub에 업로드할 파일

✅ **커밋 포함:**
```
vibeX/
├── parts/
├── vibeX-main.js
├── vibeX-calculator.js
└── README.md

pageA/
├── parts/
├── pageA-script.js
└── README.md

build.js
package.json
.gitignore
README.md
```

❌ **커밋 제외:**
```
vibeX/index.html (자동 생성)
pageA/index.html (자동 생성)
node_modules/ (npm install로 복구)
```

### 3️⃣ 워크플로우

#### 개발 중 커밋

```bash
# vibeX 수정
git add vibeX/parts/04-calculator.html
git commit -m "feat: vibeX 계산기 UI 개선"

# 여러 파일 수정
git add vibeX/
git commit -m "refactor: vibeX 요금 계산 로직 개선"

# 빌드 스크립트 수정
git add build.js
git commit -m "build: 멀티 페이지 빌드 시스템 최적화"
```

#### 배포 전 빌드

```bash
# index.html 생성 (로컬 테스트용)
npm run build

# .gitignore에 있으므로 자동으로 커밋 제외
# 배포할 때만 필요 (서버에서 npm run build로 생성)
```

### 4️⃣ 커밋 메시지 가이드

```bash
# 좋은 예시:
git commit -m "feat: vibeX 계산기 기능 추가"
git commit -m "fix: pageA 플랜 카드 버그 수정"
git commit -m "refactor: 빌드 시스템 개선"
git commit -m "docs: pageA README 작성"
git commit -m "feat: pageA 프로젝트 추가"

# 안 좋은 예시:
git commit -m "수정"
git commit -m "파일 변경"
git commit -m "업데이트"
```

#### 커밋 타입

| 타입 | 설명 |
|------|------|
| **feat** | 새로운 기능 또는 페이지 추가 |
| **fix** | 버그 수정 |
| **refactor** | 코드 구조 개선 |
| **docs** | 문서 수정 |
| **build** | 빌드 설정 수정 |
| **style** | 스타일 수정 (기능 변화 없음) |
| **perf** | 성능 개선 |

## 🔗 팀 협업 가이드

### AI 작업 시 컨텍스트 분리

#### vibeX 작업 예시
```
"vibeX/ 폴더의 파일들만 읽어주세요"
"vibeX/parts/04-calculator.html을 수정해주세요"
"vibeX 빌드를 실행해주세요: npm run build:vibeX"
```

#### pageA 작업 예시
```
"pageA/ 폴더만 집중해서 작업해주세요"
"pageA/parts/02-body.html을 수정해주세요"
"pageA 빌드를 실행해주세요: npm run build:pageA"
```

### 새로운 팀원 온보딩

```bash
# 저장소 클론
git clone https://github.com/username/소셜리스닝.git
cd 소셜리스닝

# 의존성 설치
npm install

# 개발 시작 (vibeX 예시)
npm run watch:vibeX

# 브라우저에서 확인
# vibeX/index.html 열기
```

### 새 페이지 추가 절차

#### ⚠️ 주의: 다음은 추가 페이지(pageA, pageB, pageC)를 만들 때의 일반 프로세스입니다!

**현재 저장소 상태:**
- ✅ **vibeX/** - 완성된 가격 책정 페이지 (이미 운영 중)
- 📋 **pageA/, pageB/, pageC/** - 미래에 추가할 독립적인 프로젝트들

**새 페이지를 추가할 때 (예: pageA):**

```bash
# 1. 새 페이지 폴더 생성
mkdir pageA
mkdir pageA/parts

# 2. 페이지별 HTML 파일 작성
# pageA/parts/01-head.html       (메타, CSS 링크)
# pageA/parts/02-header.html     (네비게이션)
# pageA/parts/03-body.html       (페이지 콘텐츠)
# pageA/parts/04-scripts.html    (JS 로드)

# 3. 필요시 JS 파일 작성
# pageA/pageA-main.js           (UI 로직)
# pageA/pageA-custom.js         (커스텀 로직)

# 4. pageA만 빌드해서 테스트
npm run build:pageA

# 5. pageA/index.html가 생성되었는지 확인
ls pageA/index.html

# 6. 브라우저에서 열어서 동작 확인
# pageA/index.html를 브라우저에서 열기

# 7. 완료 후 Git 커밋
git add pageA/
git commit -m "feat: pageA 프로젝트 추가"

# 8. 이제 npm run build 시 pageA도 자동으로 빌드됨
```

**각 페이지는 완전히 독립적입니다:**
- vibeX와 pageA는 서로 다른 코드, 다른 목적
- 충돌이나 간섭 없음
- AI와 작업할 때: "pageA/ 폴더만 작업해주세요" 라고 지시 가능

## 🐛 트러블슈팅

### 빌드가 안 될 때

```bash
# 1. Node.js 버전 확인
node --version  # v14 이상 필요

# 2. npm 재설치
rm -rf node_modules package-lock.json
npm install

# 3. 수동 빌드
npm run build
```

### "parts/ 디렉토리를 찾을 수 없습니다" 오류

```bash
# 페이지 폴더 내에 parts/ 디렉토리가 없는 경우
# 예: npm run build:pageA 실행 시 pageA/parts/ 없음

# 해결:
mkdir pageA/parts
```

### 변경사항이 반영 안 될 때

```bash
# 1. watch 모드 확인
npm run watch:vibeX

# 2. 강제 새로고침
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# 3. 캐시 삭제 후 새로고침
# 브라우저 개발자도구 > Application > Clear All
```

### HTML 구조 오류

```bash
# parts/ 파일 검사
# 특히 HTML 태그가 제대로 닫혀있는지 확인

# 예: <div> 태그 누락 ❌
<section>
  <div class="container">
    <!-- 닫는 태그 누락! -->
</section>

# 올바른 예 ✅
<section>
  <div class="container">
  </div>
</section>
```

## 📊 빌드 시스템 상세

### build.js 동작

```javascript
1. 루트 디렉토리의 모든 폴더 스캔
2. "parts/" 디렉토리가 있는 폴더 탐지 (페이지 폴더)
3. 각 페이지 폴더의 parts/ 내 HTML 파일 수집
4. 파일명 순서대로 정렬 (01-*, 02-*, ...)
5. <!doctype html><html lang="ko"> 추가
6. 모든 parts 파일 내용 순차적으로 합침
7. </html> 추가
8. index.html로 저장
9. 빌드 통계 출력 (파일 개수, 라인 수, 크기)
```

### CLI 사용

```bash
# 모든 페이지 빌드
node build.js

# 특정 페이지만 빌드
node build.js vibeX
node build.js pageA
```

## 🔗 관련 문서

- [vibeX 프로젝트 설명](vibeX/README.md) - vibeX 페이지 상세 가이드
- [Tailwind CSS 문서](https://tailwindcss.com)
- [MDN HTML 가이드](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Git 공식 문서](https://git-scm.com/doc)

## 📞 문의 및 지원

문제가 발생하면:
1. 이 README를 다시 읽어보기
2. `build.js`와 `package.json` 확인
3. 터미널의 에러 메시지 읽어보기
4. `.gitignore` 설정 확인

---

**Last Updated:** 2025-01-20
**Version:** 2.0.0 (멀티 페이지)
**License:** MIT
